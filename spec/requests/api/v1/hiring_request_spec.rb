require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe '#hiring_request', type: :request do
  let(:tutor) { FactoryBot.create(:teacher, hourly_rate_cents: 1000) }
  let(:learner) { FactoryBot.create(:learner) }

  context 'hiring_request' do
     before(:each) do
      learner.approve!
      sign_in learner
      @client_id, @token = learner.create_token
      @parameters = { 'uid': learner.email, 'client': @client_id, 'access-token': @token} 
    end

    it 'creats the hiring request' do
      data = { hiring_request: { tutor_id: tutor.id } }
      data = data.merge(@parameters)

      post "/api/v1/hiring_requests", params: data

      expect(response).to be_success
      expect(HiringRequest.count).to eql(1)
    end
  end
end