require 'rails_helper'

RSpec.describe Conversation do
  let!(:tutor) { FactoryBot.create(:tutor) }
  let!(:parent) { FactoryBot.create(:parent) }

  describe 'scopes' do
    describe 'between' do
      let(:conversation) {
        FactoryBot.create(:conversation,
          sender: parent,
          recipient: tutor
        )
      }

      it 'returns conversation entry between tutor and parent' do
        expect(Conversation.between(tutor.id, parent.id)).to include(conversation)
      end
	end
  end
end
