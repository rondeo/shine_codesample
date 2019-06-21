require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe 'Tutor Application Request', type: :request do
  describe 'applying to tutor' do
    context 'when a tutor application does not exist' do
      it 'creates a user' do
        data = {
          email: 'tutor@email.com',
          first_name: 'Fname',
          bio: 'I am a great tutor',
          password: 'password1',
          password_confirmation: 'password1',
        }

        expect {
          post '/api/v1/auth', params: data
        }.to change {
          User.count
        }.from(0)
          .to(1)
      end

      context 'and references are included' do
        it 'creates the reference requests' do
          data = {
            email: 'tutor@email.com',
            first_name: 'Fname',
            bio: 'I am a great tutor',
            password: 'password1',
            password_confirmation: 'password1',
            references_attributes: [
              {
                name: 'Parent1',
                email: 'parent@email.com',
                personal_note: 'I would really love your reference',
              },
              {
                name: 'Parent2',
                email: 'parent2@email.com',
                personal_note: 'I would really love your reference',
              },
              {
                name: 'Parent3',
                email: 'parent3@email.com',
                personal_note: 'I would really love your reference',
              },
            ]
          }

          expect {
            post '/api/v1/auth', params: data
          }.to change {
            Reference.count
          }.from(0)
            .to(3)

          tutor = User.find_by(email: 'tutor@email.com')
          expect(tutor).to_not eq nil
          expect(tutor.references.count).to eq 3

        end
      end
    end

    context 'when a tutor application exists' do
      let!(:tutor) {
        FactoryBot.create(:tutor, approved: false, email: 'tutor@email.com', first_name: 'Fname')
      }

      # TODO: can email us to update their application if desired
      # TODO: let applicants log in immediately to edit their profile and request add'l refs, but display a red banner "Your application has not yet been approved. If you want to know why // improve your chances, can reach out to us at ...
      xit 'lets the user know their application already exists'

      xit 'finds and updates the application with new info' do
        data = {
          email: 'tutor@email.com',
          first_name: 'NewFname',
        }

        expect(User.count).to eq 1
        expect {
          post '/api/v1/auth', params: data
        }.to change {
          tutor.first_name
        }.from('Fname')
          .to('NewName')
        expect(User.count).to eq 1
      end
    end

  end
end
