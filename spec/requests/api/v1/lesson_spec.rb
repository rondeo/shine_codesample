require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe '#lesson', type: :request do
  let(:tutor) { FactoryBot.create(:teacher, hourly_rate_cents: 1000, stripe_account_id: 'test001') }
  let(:learner) { FactoryBot.create(:learner, stripe_token_id: 'tktest_001') }
  let!(:hiring_request) { HiringRequest.create(learner: learner, tutor: tutor) }
  let(:lesson) { FactoryBot.create(:lesson, tutor: tutor, learner: learner) }
  let(:charge) { FactoryBot.create(:charge, lesson: lesson) }

  describe 'lesson' do
    context 'tutor view' do
      before(:each) do
        allow_any_instance_of(Lesson).to receive(:charge_parent).and_return(charge)
        tutor.approve!
        sign_in tutor
        @client_id, @token = tutor.create_token
        @parameters = { 'uid': tutor.email, 'client': @client_id, 'access-token': @token} 
      end

      it 'creates the lesson' do
        data = {
          lesson: {
            learner_id: learner.id,
            tutor_id: tutor.id,
            hours: 5,
            lesson_date: Date.today,
            summary: 'lorum ipsum'
          }
        }
        data = data.merge(@parameters)

        expect {
          post '/api/v1/lessons', params: data
        }.to change { Lesson.count }.from(1).to(2)
         
        expect(response).to be_success
      end


      it 'returns the list of parents who hired the tutor' do
        get '/api/v1/lessons/parents', params: @parameters

        expect(response).to be_success

        data = JSON.parse(response.body)

        expect(data['parents'].count).to eql(1)
      end

      it 'returns the list of lessons created by tutor for specific parent' do
        data = {learner_id: learner.id }
        data = data.merge(@parameters)

        get '/api/v1/lessons', params: data
        data = JSON.parse(response.body)
        expect(response).to be_success
        expect(data['lessons'].count).to eql(1)
        expect(data['lessons'].first['id']).to eql(lesson.id)
      end
    end  

    context 'parent view' do
      before(:each) do
        learner.approve!
        lesson.save!
        sign_in learner
        @client_id, @token = learner.create_token
        @parameters = { 'uid': learner.email, 'client': @client_id, 'access-token': @token} 
      end

      it 'returns the list tutors for parents' do
        get "/api/v1/lessons/tutors", params: @parameters

        expect(response).to be_success

        data = JSON.parse(response.body)
        
        expect(data.count).to eql(1)
        expect(data.first['user']['id']).to eql(tutor.id)
      end

      it 'returns the list of lessons for parent created by specific tutor' do

        data = { tutor_id: tutor.id  }
        data = data.merge(@parameters)

        get "/api/v1/lessons/tutors", params: data
        lessons = JSON.parse(response.body)
        expect(response).to be_success
        expect(lessons['lessons'].count).to eql(1)
        expect(lessons['lessons'].first['id']).to eql(lesson.id)
      end
    end  
  end
end
