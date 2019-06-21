require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe '#message', type: :request do
  let!(:tutor) { FactoryBot.create(:teacher, approved: true) }
  let!(:learner) { FactoryBot.create(:learner, approved: true) }
  let(:conversation) { FactoryBot.create(:conversation, sender_id: learner.id, recipient_id: tutor.id) }
  let(:message) { FactoryBot.create(:message, conversation_id: conversation.id, user_id: learner.id) }

  context 'message' do
    before(:each) do
      sign_in learner
      @client_id, @token = learner.create_token
      @parameters = { 'uid': learner.email, 'client': @client_id, 'access-token': @token}
    end

    it 'returns the list of user had a conversation' do
      conversation.save!
      message.save!
      
      get "/api/v1/messages", params: @parameters

      data = JSON.parse(response.body)
      expect(data.count).to eql(1)
      expect(data[0]['other_user']['id']).to eql(tutor.id)
      expect(response).to be_success
    end

    it 'returns message for specific conversation' do
      conversation.save!
      message.save!

      get "/api/v1/messages/#{conversation.id}/conv_messages", params: @parameters

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['coversations'].count).to eql(1)
      expect(data['coversations'][0]['content']).to eql(message.content)
    end

    it 'creates the conversation and sends message to tutor' do
      data = { sender_id: learner.id,  recipient_id: tutor.id, message: { content: 'This is for testing.'} }
      data = data.merge(@parameters)

      post "/api/v1/messages", params: data

      expect(response).to be_success
      expect(Message.count).to eql(1)
      expect(Conversation.count).to eql(1)
    end
  end
end
