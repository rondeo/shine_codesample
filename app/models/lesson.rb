class Lesson < ApplicationRecord
  enum payment_status: %i[paid unpaid refund]
  MAX_PAYMENT_RETRY_COUNT = 3

  enum status: %i[pending approved rejected]

  belongs_to :tutor, foreign_key: :tutor_id, class_name: :User
  belongs_to :learner, foreign_key: :learner_id, class_name: :User

  validates :lesson_date, :summary, :tutor_id, :learner_id, presence: true
  validate :tutor_bank_account

  has_many :charges

  # HOURS field temporarily removed from FE, default to zero to remain compatible
  after_initialize :set_default_hours
  after_create :send_email

  scope :retryable, ->() {
    where('retry_count <= ? ', Lesson::MAX_PAYMENT_RETRY_COUNT)
  }

  def duration_in_mins
    "#{hours.to_i * 60 + minutes.to_i} mins"
  end

  def duration
    hours.to_i + (minutes.to_f/ 60).round(2)
  end

  def date
    lesson_date.strftime('%a %m/%d/%y')
  end

  def lesson_json
    as_json(
      include: {
        learner: {
          only: [:id],
          methods: %i[image_url name]
        },
        tutor: {
          only: [:id],
          methods: %i[image_url name]
        }
      },
      methods: %i[duration_in_mins date],
      only: %i[
        id
        hours
        tutor_id
        payment_status
        summary
        subject
        created_at
        status
      ]
    )
  end

  def charge_parent
    amount_in_cents = chargeable_amount
    charge = { lesson_id: id,
               amount: amount_in_cents,
               txn_type: Charge.txn_types[:credit],
               hours: duration,
               price_per_hour: price_per_hours,
               payout_amount: payout_amount,
               payout_percentage: ENV['PAYOUT_PERCENTAGE'].to_f }
    begin
      response = Stripe::Charge.create(
        amount: amount_in_cents.to_i,
        currency: 'usd',
        customer: learner.stripe_customer_id,
        destination: {
          amount: payout_amount,
          account: tutor.stripe_account_id
        }
      )

      if response.present? && response.status == 'succeeded'
        charge[:status] = Charge.statuses[:success]
        charge[:stripe_reference] = response.id
        lesson_payment_status = Lesson.payment_statuses[:paid]
      else
        charge[:status] = Charge.statuses[:failed]
        charge[:failure_code] = response.failure_code
        charge[:failure_message] = Charge.statuses[:failure_message]
        lesson_payment_status = Lesson.payment_statuses[:unpaid]
        SendPaymentFailureEmailJob.perform_later(learner.id, tutor.id)
      end
      charge = Charge.new(charge)
      charge.save!
    rescue => error
      charge[:status] = Charge.statuses[:failed]
      charge[:failure_message] = error
      lesson_payment_status = Lesson.payment_statuses[:unpaid]
      charge = Charge.new(charge)
      charge.save!
      SendPaymentFailureEmailJob.perform_later(learner.id, tutor.id)
    end

    update_attribute(:payment_status, lesson_payment_status)
  end

  def payout_to_tutor
    charge = { lesson_id: id,
               amount: payout_amount,
               txn_type: Charge.txn_types[:debit],
               hours: hours,
               price_per_hour: price_per_hours,
              }
    begin
      response = Stripe::Transfer.create(
        amount: payout_amount.to_i,
        currency: 'usd',
        destination: tutor.stripe_account_id
      )

      if response.present?
        charge[:status] = Charge.statuses[:success]
        charge[:stripe_reference] = response.id
      else
        charge[:status] = Charge.statuses[:failed]
      end
      charge = Charge.new(charge)
      charge.save!
    rescue
      charge[:status] = Charge.statuses[:failed]
      charge = Charge.new(charge)
      charge.save!
    end
  end

  def payout_amount
    ((chargeable_amount * ENV['PAYOUT_PERCENTAGE'].to_f) / 100).round
  end

  def price_per_hours
    hiring_request = learner.hiring_request(tutor)
    hiring_request.tutor_hourly_rate_cents
  end

  def chargeable_amount
    (price_per_hours * duration).round
  end

  def hourly_rate
    (price_per_hours.to_f / 100).round(2)
  end 

  def chargeable_amount_in_dollar
    (chargeable_amount.to_f / 100).round(2)
  end 

  def charged_amount_in_dollar
    return 0 if charges.blank?

    (charges.first.amount.to_f / 100).round(2)
  end  

  private

  def set_default_hours
    self.hours ||= 0
  end

  def send_email
    SendLessonEmailJob.perform_later(id)
  end

  def tutor_bank_account
    if tutor.present? && tutor.stripe_account_id.blank?
      errors.add(:tutor_id, 'make sure to add bank information')
    end
  end
end
