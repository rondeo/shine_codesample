require 'rails_helper'

RSpec.describe Reference do
  let!(:tutor) { FactoryBot.create(:tutor) }
  let!(:parent) { FactoryBot.create(:parent) }

  describe 'scopes' do
    describe 'unconfirmed' do
      let(:reference) {
        FactoryBot.create(
          :reference,
          :unconfirmed,
          :no_reminders,
          :reference_from, parent: parent,
          user: tutor,
        )
      }
      it 'returns unconfirmed references' do
        expect(Reference.unconfirmed).to include(reference)
      end

      it 'does not return confirmed references' do
        reference.update_attributes({ confirmed: true })
        expect(Reference.unconfirmed).to_not include(reference)
      end
    end

    describe 'remindable' do
      let(:ref_no_reminders) {
        FactoryBot.create(
          :reference,
          :unconfirmed,
          :no_reminders,
          :reference_from, parent: parent,
          user: tutor,
        )
      }
      let(:ref_too_many_reminders) {
        FactoryBot.create(
          :reference,
          :unconfirmed,
          :exceeded_reminders,
          :reference_from, parent: parent,
          user: tutor,
        )
      }
      let(:ref_reminded_yesterday) {
        FactoryBot.create(
          :reference,
          :unconfirmed,
          :reference_from, parent: parent,
          user: tutor,
          last_reminder_at: 1.day.ago,
        )
      }
      let(:ref_reminded_two_weeks_ago) {
        FactoryBot.create(
          :reference,
          :unconfirmed,
          :reference_from, parent: parent,
          user: tutor,
          last_reminder_at: 2.weeks.ago,
        )
      }
      it 'returns references with <= the max reminder count' do
        expect(Reference.remindable).to include(ref_no_reminders)
      end

      it 'does not return references with > the max reminder count' do
        expect(Reference.remindable).to_not include(ref_too_many_reminders)
      end

      it 'returns references with last reminder >= the last week' do
        expect(Reference.remindable).to include(ref_reminded_two_weeks_ago)
      end

      it 'does not return references with last reminder < the last week' do
        expect(Reference.remindable).to_not include(ref_reminded_yesterday)
      end
    end
  end

end
