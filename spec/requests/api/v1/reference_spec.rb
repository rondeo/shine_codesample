require 'rails_helper'
require 'factory_bot'
require_relative '../../../../spec/support/auth_helper.rb'

RSpec.describe '#reference', type: :request do

  let(:tutor) { FactoryBot.create(:teacher, approved: true) }
  let(:learner) { FactoryBot.create(:learner, email: 'lorumipsum@gmail.com') }
  let(:reference) {FactoryBot.create(:reference, reference_text: 'lorumipsum', user: tutor)}

  context 'reference' do
    it 'creats the refernce for tutor' do

      data = { user_id: tutor.id,  reference_text: 'This is for testing.', referenced_by: learner.id}
      post "/api/v1/references", params: { reference:  data}

      data = JSON.parse(response.body)
      expect(response).to be_success
      expect(Reference.count).to eql(1)
    end

    it 'update the refernce for tutor to whom he invited for reference' do

      data = { reference_text: 'This is for testing.', referenced_by: learner.id, user_id: tutor.id}
      put "/api/v1/references/#{reference.id}", params: { reference:  data }

      data = JSON.parse(response.body)
      expect(response).to be_success

      reference.reload

      expect(Reference.count).to eql(1)
      expect(reference.confirmed).to be true
      expect(reference.reference_text).to eql('This is for testing.')
    end
  end
end
