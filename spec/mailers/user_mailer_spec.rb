require "rails_helper"
require 'factory_bot'

RSpec.describe UserMailer, type: :mailer do
  describe 'welcome email' do
    it 'is not empty' do
      tutor = FactoryBot.create(:teacher)

      welcome = UserMailer.welcome_email(tutor.id)

      expect(welcome.subject).to_not eq ""
      expect(welcome.from).to_not be_empty
      expect(welcome.to).to_not be_empty
      expect(welcome.body.encoded).to match(/recommend you to parents/)
    end

    it 'sends' do
      tutor = FactoryBot.create(:teacher)

      welcome = UserMailer.welcome_email(tutor.id)

      expect {
        welcome.deliver_now
      }.to change {
        ActionMailer::Base.deliveries.count
      }
        .by(1)
    end
  end
end
