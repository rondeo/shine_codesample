require 'rails_helper'

RSpec.describe HiringRequest do
  include ActiveJob::TestHelper

  let!(:tutor) { FactoryBot.create(:tutor, hourly_rate_cents: 1000) }
  let!(:parent) { FactoryBot.create(:learner) }
  
  describe 'hiring request' do
    context 'is_hired' do
      it 'validates tutor hired or not' do
        HiringRequest.create(learner: parent, tutor: tutor)
        expect(HiringRequest.is_hired(tutor.id, parent.id)).to eql(1)
      end
	  end

    context 'send email' do
      before do
        clear_enqueued_jobs
        clear_performed_jobs
      end
      it 'sends email to tutor when request create' do
        HiringRequest.create(learner: parent, tutor: tutor)
        expect(enqueued_jobs.size).to eq 1
      end
    end
  end
end
