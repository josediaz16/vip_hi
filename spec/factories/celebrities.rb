FactoryBot.define do
  factory :celebrity do
    biography { Faker::Lorem.paragraph }
    association :user, factory: :user_celebrity, confirmed_at: Time.now
  end
end
