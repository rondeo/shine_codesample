require 'sucker_punch'

class ProcessFailedChargesJob < ActiveJob::Base
  include ::SuckerPunch::Job
  queue_as :default

  def perform(user_id)
    learner = User.find(user_id)
    learner.process_failed_charges
  rescue => e
    Rails.logger.error("Charge processing failed after card update: #{e}")
  end
end
