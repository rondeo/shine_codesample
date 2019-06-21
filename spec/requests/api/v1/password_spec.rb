require 'rails_helper'
require 'factory_bot'

RSpec.describe 'Password', type: :request do
  context 'Reset password' do
    let!(:teacher) { FactoryBot.create(:teacher) }

    context 'wrong user' do
      it 'does not allow user to change password' do
        post api_v1_user_password_path(email: 'test@gmail.com', redirect_url: 'test')

        expect(response.status).to eq 404
      end
    end

    context 'with approved user' do
      before(:each) do
        teacher.approve!
        teacher.reload
      end

      it 'allows user to change password' do
        post api_v1_user_password_path(email: teacher.email, redirect_url: 'test')
        puts response.body
        expect(response.status).to eq 200
      end
    end

    context 'with un-approved user' do
      it 'does not allow the user to log in' do
        post api_v1_user_password_path(email: teacher.email, redirect_url: 'test')

        expect(response.status).to eq 401
      end
    end
  end
end
