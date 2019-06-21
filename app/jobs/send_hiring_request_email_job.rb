require 'sucker_punch'

class SendHiringRequestEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(id)
    UserMailer.hiring_email(id).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING HIRING EMAIL: #{e}")
  end
end
