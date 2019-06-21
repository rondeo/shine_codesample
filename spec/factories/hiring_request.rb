FactoryBot.define do
  factory :hiring_request do
    association :learner, factory: :learner
    association :tutor, factory: :teacher
  end
end