class Learner < User
  has_many :lessons, foreign_key: :learner_id

  def without_failed_charge?
    lessons.unpaid.blank?
  end

  def process_failed_charges
    failed_payment_lessons = lessons.unpaid
    return if failed_payment_lessons.blank?

    failed_payment_lessons.each(&:charge_parent)
    # Set retry count 0 if charge not created successfully
    failed_payment_lessons = lessons.unpaid
    failed_payment_lessons.update_all(retry_count: 0) if failed_payment_lessons.present?
  end
end
