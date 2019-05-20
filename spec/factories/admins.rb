FactoryBot.define do
  factory :admin do
    association :user, factory: :user_admin, confirmed_at: Time.now
  end
end
