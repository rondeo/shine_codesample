require 'sucker_punch'

class SendPaymentFailureEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(parent_id, tutor_id)
    UserMailer.payment_failure_email(parent_id, tutor_id).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING PAYMENT FAILURE EMAIL: #{e}")
  end
end
