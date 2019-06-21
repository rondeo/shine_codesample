namespace :reference do
  desc 'Send reminder to parents for refernce'
  task reminder: :environment do
    user_references = Reference
                      .unconfirmed
                      .remindable

    user_references.find_in_batches(batch_size: 200).each do |references|
      references.each do |reference|
        begin
          reference.update_attributes(
            reminder_count: reference.reminder_count + 1,
            last_reminder_at: Time.now
          )

          UserMailer.reminder_email_to_reference(reference).deliver_now
        rescue => e
          Rails.logger.error("FAILED SENDING REFERENCE REMINDER EMAIL TO REFERNCE ID {reference.id}: #{e}")
        end
      end
    end
  end
end
