FactoryBot.define do
  factory :celebrity do
    from     { Faker::Name.name }
    to       { Faker::Name.name }
    email_to { Faker::Internet.email }
    brief    { Faker::Lorem.paragraph }
    association :celebrity
  end
end
