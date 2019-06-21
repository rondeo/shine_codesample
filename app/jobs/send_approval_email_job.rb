require 'sucker_punch'

class SendApprovalEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(user_id)
    UserMailer.welcome_email(user_id).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING WELCOME EMAIL: #{e}")
  end
end
