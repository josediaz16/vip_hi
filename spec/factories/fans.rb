FactoryBot.define do
  factory :fan do
    association :user, factory: :user_fan, confirmed_at: Time.now
  end
end
