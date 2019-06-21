require 'rails_helper'
require 'factory_bot_rails'

RSpec.describe User do
  include ActiveJob::TestHelper

  describe 'when user is created' do
    context 'when the user to a Teacher' do
      it 'sets approved to false' do
        u = FactoryBot.create(:teacher)

        expect(u.approved).to eq false
      end
    end

    context 'when the user is a Learner' do
      it 'sets approved to false (until guided search is matched)' do
        u = FactoryBot.create(:learner)

        expect(u.approved).to eq false
      end
    end
  end

  describe 'mailing' do
    after do
      clear_enqueued_jobs
      clear_performed_jobs
    end

    context 'when a tutor is approved' do
      it 'schedules a welcome email' do
        u = FactoryBot.create(:teacher, approved: false)

        expect do
          u.approve!
        end.to change {
          u.approved
        }
          .from(false)
          .to(true)

        expect(enqueued_jobs.size).to eq 2 # registration email and approval email
      end

      it "sets the user's Stripe Express state" do
        u = FactoryBot.create(:teacher, approved: false)

        expect do
          u.approve!
        end.to change {
          u.express_state
        }

        expect(u.express_state.to_s.length).to eq 12
      end
    end

    context 'when a parent is approved' do
      it 'schedules a welcome email' do
        u = FactoryBot.create(:learner)

        expect do
          u.approve!
        end.to change {
          u.approved
        }
          .from(false)
          .to(true)

        expect(enqueued_jobs.size).to eq 1
      end
    end

    context 'when a reference added' do
      it 'schedules an reference email' do
        FactoryBot.create(:teacher, approved: false)
        expect(enqueued_jobs.to_s).to_not match /SendReferenceEmailJob/

        FactoryBot.create(:teacher, :with_references, approved: false)
        expect(enqueued_jobs.to_s).to match /SendReferenceEmailJob/
      end
    end
  end

  describe 'qualified_tutors_for' do
    context 'when both city and ZIP are provided' do
      let!(:tutor_in_CA) { FactoryBot.create(:teacher, zip: '94109') }
      let!(:tutor_in_NY) { FactoryBot.create(:teacher, zip: '02121') }

      it 'searches by ZIP code' do
        search_results_sf_zip = User.qualified_tutors_for(
          zip: '94109', city: 'New York City'
        ).map(&:id)
        expect(search_results_sf_zip).to include tutor_in_CA.id
        expect(search_results_sf_zip).to_not include tutor_in_NY.id
      end
    end
  end
end
