require 'sucker_punch'

class SendLessonRejectedEmailJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(lesson_id)
    UserMailer.lesson_rejection_email(lesson_id).deliver_now
  rescue => e
    Rails.logger.error("FAILED SENDING REFERENCE EMAIL: #{e}")
  end
end