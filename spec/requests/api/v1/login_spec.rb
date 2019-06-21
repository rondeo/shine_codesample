require 'rails_helper'
require 'factory_bot'

RSpec.describe 'Logging in', type: :request do
  context 'when the user is a Teacher' do
    let!(:teacher) { FactoryBot.create(:teacher) }

    context 'with approved user' do
      before(:each) do
        teacher.approve!
      end

      it 'allow the user to log in' do
        post api_v1_user_session_path(email: teacher.email, password: teacher.password)

        expect(response.status).to eq 200
      end

      it 'does not allow the user to log in with wrong password' do
        post api_v1_user_session_path(email: teacher.email, password: 'wrong-password')

        expect(response.status).to eq 401
        expect(response.body).to match(/Invalid login credentials/)
      end
    end

    context 'with un-approved user' do
      it 'does not allow the user to log in' do
        post api_v1_user_session_path(email: teacher.email, password: teacher.password)

        expect(response.status).to eq 401
        expect(response.body).to match(/application is still under review/)
      end
    end
  end
end
