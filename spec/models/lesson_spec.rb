require 'rails_helper'

RSpec.describe Lesson, type: :model do
  let(:tutor) { FactoryBot.create(
    :teacher,
    approved: true,
    hourly_rate_cents: 1000,
    stripe_account_id: 'test001'
  ) }
  let(:tutor_without_bank_info) {
    FactoryBot.create(
      :teacher,
      approved: true,
      hourly_rate_cents: 1000,
    ) }
  let(:learner) { FactoryBot.create(:learner) }
  let!(:hire_request) { HiringRequest.create(
    learner: learner,
    tutor: tutor,
    tutor_hourly_rate_cents: 1000,
  ) }
  let(:lesson) { FactoryBot.create(
    :lesson,
    tutor: tutor,
    learner: learner,
    hours: 5,
    payment_status: Lesson.payment_statuses[:paid],
  ) }
  let(:build_lesson) { FactoryBot.build(
    :lesson,
    tutor: tutor_without_bank_info,
    learner: learner,
    hours: 5,
    payment_status: Lesson.payment_statuses[:paid],
  ) }
  let(:unpaid_lesson) { FactoryBot.create(
    :lesson,
    tutor: tutor,
    learner: learner,
    hours: 5,
    payment_status: Lesson.payment_statuses[:unpaid]
  ) }

  context '#tutor with bank info' do
    it 'returns charge amount for the parent' do
    	expect(lesson.chargeable_amount).to eql(5000)
    end

    it 'returns payout amount for the tutor' do
    	expect(lesson.payout_amount).to eql(3750)
    end

    it 'returns payout amount for the tutor' do
      expect(lesson.payout_amount).to eql(3750)
    end
  end

  context '#tutor without bank info' do
    it 'does not allow to create lesson' do
      expect(build_lesson.valid?).to be false
      expect(build_lesson.errors[:tutor_id]).to include('make sure to add bank information')
    end
  end

  describe 'scopes' do
    describe 'retryable' do
      it 'returns conversation entry between tutor and parent' do
        expect(Lesson.retryable).to include(unpaid_lesson)
      end
    end
  end

end
