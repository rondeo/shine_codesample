require 'faker'

FactoryBot.define do
  factory :reference do
    name Faker::Name.first_name
    email Faker::Internet.email
    reference_text ''
    association :tutor, factory: :tutor
    no_reminders
    unconfirmed
  end

  trait :reference_from do
    transient do
      parent nil
    end

    after :create do |reference, options|
      reference.referenced_by = options.parent.id
      reference.name = options.parent.name
      reference.email = options.parent.email
      reference.save!
    end
  end

  trait :no_reminders do
    reminder_count 0
  end
  trait :exceeded_reminders do
    reminder_count Reference::MAX_REMINDER + 1
  end

  trait :confirmed do
    confirmed true
  end
  trait :unconfirmed do
    confirmed false
  end
end
