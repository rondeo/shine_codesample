FactoryBot.define do
  factory :conversation do
    association :sender, factory: :learner
    association :recipient, factory: :tutor
  end
end
