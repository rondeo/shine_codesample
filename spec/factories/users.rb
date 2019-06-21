require 'faker'

FactoryBot.define do
  factory :user do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
    sequence(:email) { |n| "#{n}#{Faker::Internet.email}" }

    password SecureRandom.hex
    approved false

    factory :admin do
      type User::TYPE_ADMIN
    end

    trait :with_references do
      references { build_list :reference, 1 }
    end

    factory :learner, aliases: %i[parent student], parent: :user, class: 'Learner' do
    end

    factory :teacher, aliases: [:tutor], parent: :user, class: 'Teacher' do
    end
  end
end
