class HiringRequest < ApplicationRecord
  belongs_to :tutor, foreign_key: :tutor_id, class_name: :Teacher
  belongs_to :learner, foreign_key: :learner_id, class_name: :Learner

  has_one :conversation

  validates :tutor_id, :learner_id, :tutor_hourly_rate_cents, presence: true
  validates :learner_id, uniqueness: { scope: :tutor_id }

  before_validation :set_hourly_rate, :set_subject

  after_commit :send_email, on: :create
  after_commit :find_or_create_conversation, on: :create

  scope :is_hired, ->(tutor_id, learner_id) do
    where(
      '(tutor_id = ? AND learner_id =?) OR (tutor_id = ? AND learner_id = ?)',
      tutor_id, learner_id,
      learner_id, tutor_id
    ).count
  end

  def hourly_rate
    hourly_cents = self.tutor_hourly_rate_cents
    if hourly_cents
      "#{sprintf("%.2f",hourly_cents / 100.0)}"
    else
      nil
    end
  end

  private

  def send_email
    SendHiringRequestEmailJob.perform_later(self.id)
  end

  def set_hourly_rate
    self.tutor_hourly_rate_cents = tutor.hourly_rate_cents if tutor.present?
  end

  def set_subject
    self.subject = tutor.subject if tutor.present?
  end

  # in manual hiring_flow (hired through Admin dash)
  # create Conversation so Tutor can show up in Parent's Messages
  def find_or_create_conversation
    c = Conversation.fetch_conversation(self.tutor_id, self.learner_id)
    if !c.hiring_request_id
      c.hiring_request_id = self.id
      c.save!
    end
  end
end
