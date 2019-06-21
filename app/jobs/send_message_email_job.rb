require 'sucker_punch'

class SendMessageEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(user_id, receiver_id, content)
    UserMailer.msg_email(user_id, receiver_id, content).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING REFERENCE EMAIL: #{e}")
  end
end
