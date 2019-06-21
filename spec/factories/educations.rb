require 'faker'

FactoryBot.define do
  factory :education do
    course 'course'
    degree 'degree'
    institute 'institute'
    association :user, factory: :tutor
  end
end
