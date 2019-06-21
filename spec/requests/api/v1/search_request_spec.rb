require 'rails_helper'
require 'factory_bot'

RSpec.describe 'GuidedSearch Request', type: :request do
  let!(:search_request_data) do
    {
      user_type: 'Student',
      grade: '6th Grader',
      school: 'MIET',
      city: 'Florida',
      subject: 'algebra-1',
      availability: ['Th--3-5pm'],
      name: 'Senior Developer',
      student_name: 'Developer',
      email: 'search@gmail.com',
      phone: Faker::PhoneNumber.cell_phone,
      zip: '12345',
      price_range: '30-50',
      tutoring_type: 'hwHelp'
    }
  end

  describe 'Search request to match tutor' do
    context 'with parent record does not exist' do
      it 'creates a search request and parent record' do
        expect(Learner.count).to eq 0

        expect do
          post '/api/v1/search_requests', params: { search_request: search_request_data }
        end.to change {
          SearchRequest.count
        }.from(0)
          .to(1)

        expect(Learner.count).to eq 1
        expect(SearchRequest.last.user).to eq(Learner.first)
        expect(Learner.first.approved).to eq false
      end
    end

    context 'with parent record exist' do
      it 'creates a search request and aasociate it to existing parent' do
        FactoryBot.create(:learner, email: 'search@gmail.com')
        expect(Learner.count).to eq 1

        expect do
          post '/api/v1/search_requests', params: { search_request: search_request_data }
        end.to change {
          SearchRequest.count
        }.from(0)
          .to(1)

        expect(Learner.count).to eq 1
        expect(SearchRequest.last.user).to eq(Learner.first)
      end
    end
  end
end
