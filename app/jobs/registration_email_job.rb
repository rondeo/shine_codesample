require 'sucker_punch'

class RegistrationEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(user_id)
    UserMailer.registration_email(user_id).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING REGISTRATION EMAIL: #{e}")
  end
end
