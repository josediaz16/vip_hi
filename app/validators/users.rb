module Validators
  class Users

    Base = Proc.new do
      configure do
        config.namespace = :user
      end

      required(:email,      DTypes::String).filled(:email?)
      required(:password,   DTypes::String).filled(min_size?: 8)
      required(:password_confirmation, DTypes::String).filled
      required(:country_id, DTypes::Integer).filled

      optional(:phone, DTypes::Phone).filled(:phone?)
      optional(:id,    DTypes::Integer).filled
      rule(password_confirmation: [:password, :password_confirmation]) do |pass, confirmation|
        pass.eql?(confirmation)
      end
    end

    CreateCelebrity = Builder.(Base) do
      required(:known_as, DTypes::String).filled
      optional(:name,     DTypes::String).filled
    end.with(object_class: :user)

    CreateFan = Builder.(Base) do
      required(:name,       DTypes::String).filled
      optional(:known_as, DTypes::String).filled
    end.with(object_class: :user)
  end
end
