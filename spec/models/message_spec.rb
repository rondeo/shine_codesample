require 'rails_helper'

RSpec.describe Message, type: :model do
  let!(:tutor) { FactoryBot.create(:tutor) }
  let!(:parent) { FactoryBot.create(:parent) }
  let!(:conv) {
    FactoryBot.create(
      :conversation,
      sender: parent,
      recipient: tutor,
    )
  }

  context 'when this is the first message in a conversation' do
    it 'sends an email notification' do
      m1 = FactoryBot.build(
        :message,
        conversation: conv,
        user: tutor,
      )
      expect(m1).to receive :send_email
      m1.save!
    end
  end

  context 'when the same user sent a previous message, but it is not recent' do
    let!(:prev_msg) {
      FactoryBot.create(
        :message,
        conversation: conv,
        user: tutor,
      )
    }
    it 'sends an email notification' do
      Message.last.update_attributes(
        created_at: 4.days.ago,
      )
      m2 = FactoryBot.build(
        :message,
        conversation: conv,
        user: tutor,
      )
      expect(m2).to receive :send_email
      m2.save!
    end
  end

  context 'when the same user recently sent a message' do
    let!(:prev_msg) {
      FactoryBot.create(
        :message,
        conversation: conv,
        user: tutor,
      )
    }
    it 'does not send an email notification' do
      m2 = FactoryBot.build(
        :message,
        conversation: conv,
        user: tutor,
      )
      expect(m2).to_not receive :send_email
      m2.save!
    end
  end
end
