FactoryBot.define do
  factory :lesson do
    association :learner, factory: :learner
    association :tutor, factory: :teacher
    summary 'lorum iupsum'
    hours 2
    lesson_date Date.today
  end
end
