FactoryBot.define do
  factory :message do
    association :conversation, factory: :conversation 
    association :user, factory: :learner
    content 'lorum iupsum'
  end
end
