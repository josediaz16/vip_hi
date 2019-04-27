FactoryBot.define do
  factory :user do
    transient do
      with_country { true }
    end

    name      { Faker::Name.name }
    email     { Faker::Internet.email }
    password  { "holifluviper"}
    phone     { "3212343213" }

    after(:build) do |user, evaluator|
      user.country ||= if evaluator.with_country
        Country.last || create(:country)
      end
    end

    trait :confirmed do
      confirmed_at { Time.now }
    end
  end
end
