require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe 'GET #search tutor', type: :request do

  let(:tutor) { FactoryBot.create(:teacher, zip: 94102, avatar_file_name: 'avatar', hourly_rate_cents: 100) }
  let(:tutor_without_hourly_rate) { FactoryBot.create(:teacher, zip: 94102, avatar_file_name: 'avatar') }
  
  context 'with unapproved tutor profie' do
    it 'returns no tutor' do
      get "/api/v1/search"

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['message']).to eql('We were not able to find any tutors in your area that matched your requirements. Please try again.')
      expect(data['users'].count).to eql(0)
    end
  end

  context 'with approved tutor profie' do
    it 'returns all approved tutor if no search parameter passed' do
      tutor.approved = true
      tutor.stripe_account_id = 'stripe_account_id'
      tutor.save!

      get "/api/v1/search"

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['message']).to eql('Users found')
      expect(data['users'].count).to eql(1)
    end
  end

  context 'with zip search' do
    before do
      tutor.approved = true
      tutor.stripe_account_id = 'stripe_account_id'
      tutor.save!
    end

    it 'returns no approved tutor if zip is not matched' do
      get "/api/v1/search", params: { zip: 90274 }

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['users'].count).to eql(0)
    end

    it 'returns all approved tutors if zip is matched' do
      get "/api/v1/search", params: { zip: 94109 }

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['users'].count).to eql(1)
    end
  end

  context 'with subject search' do
    before do
      tutor.approved = true
      tutor.stripe_account_id = 'stripe_account_id'
      tutor.save!
    end

    it 'returns no approved tutor if subject is not matched' do
      get "/api/v1/search", params: { subject: 'English' }

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['users'].count).to eql(0)
    end

    it 'returns approved tutor if subject is matched' do
      tutor.subject = 'English'
      tutor.save!

      get "/api/v1/search", params: { subject: 'English' }

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['users'].count).to eql(1)
    end
  end

  context '#avatar' do
    before do
      tutor.approved = true
      tutor.stripe_account_id = 'stripe_account_id'
      tutor.avatar_file_name = nil 
      tutor.save!
    end

    it 'returns no approved tutor without avatar' do
      get "/api/v1/search"

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['users'].count).to eql(0)
    end
  end

  context '#hourly rate' do
    before do
      tutor_without_hourly_rate.approved = true
      tutor_without_hourly_rate.stripe_account_id = 'stripe_account_id'
      tutor_without_hourly_rate.save!
    end

    it 'returns no approved tutor without hourly rate' do
      get "/api/v1/search"

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(data['users'].count).to eql(0)
    end
  end

end
