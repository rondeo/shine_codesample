namespace :retry do
  desc 'Retry failed payment'

  task payment: :environment do
    unpaid_retryable_lessons = Lesson.unpaid.retryable
             
    unpaid_retryable_lessons.find_in_batches(batch_size: 200).each do |unpaid_lessons|
      unpaid_lessons.each do |unpaid_lesson|
        begin
          unpaid_lesson.charge_parent
          unpaid_lesson.update_attrbute(retry_count: unpaid_lesson + 1)
        rescue => e
          Rails.logger.error("FAILED RETRY PAYMENT FOR LESSON ID {unpaid_lesson.id}: #{e}")
        end
      end
    end
  end
end
