require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe '#education', type: :request do

  let(:tutor) { FactoryBot.create(:teacher, approved: true) }
  let(:education) { FactoryBot.create(:education, user_id: tutor.id) }
  
  context 'education' do
    before(:each) do
      tutor.approve!
      sign_in tutor
      @client_id, @token = tutor.create_token
      @parameters = { 'uid': tutor.email, 'client': @client_id, 'access-token': @token} 
    end

    it 'creats the education for the tutor' do
      data = { education: { user_id: tutor.id,  degree: 'B.Tech', course: 'Computer Science', institute: 'M.I.E.T' } }
      data = data.merge(@parameters)

      post '/api/v1/educations', params: data


      data = JSON.parse(response.body)  

      expect(response).to be_success
      expect(Education.count).to eql(1)
      expect(data[0]['degree']).to eql('B.Tech')
      expect(data[0]['course']).to eql('Computer Science')
      expect(data[0]['institute']).to eql('M.I.E.T')
    end

    it 'updates the education' do
      data = { education: { degree: 'M.Tech' } }
      data = data.merge(@parameters)

      put "/api/v1/educations/#{education.id }", params: data

      data = JSON.parse(response.body)

      expect(response).to be_success
      expect(data[0]['degree']).to eql('M.Tech')
    end

    it 'destroy the education' do
      delete "/api/v1/educations/#{education.id}", params: @parameters 

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(Education.count).to eql(0)
    end
  end
end
