require 'faker'

FactoryBot.define do
  factory :search_request do
    user_type 'Student'
    grade '6th Grader'
    school 'MIET'
    city 'Florida'
    subject 'algebra-1'
    availability ['Th--3-5pm']
    name Faker::Name.name
    student_name Faker::Name.name
    sequence(:email) { |n| "#{n}#{Faker::Internet.email}" }
    phone Faker::PhoneNumber.cell_phone
    zip '12345'
    price_range '30-50'
    tutoring_type 'hwHelp'
  end
end
