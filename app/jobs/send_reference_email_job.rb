require 'sucker_punch'

class SendReferenceEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(ref_id)
    UserMailer.reference_email(ref_id).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING REFERENCE EMAIL: #{e}")
  end
end
