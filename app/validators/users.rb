module Validators
  class Users

    Base = Proc.new do
      configure do
        config.namespace = :user
      end

      required(:email).filled(:str?, :email?)
      required(:password).filled(:str?, min_size?: 8).confirmation
      required(:country_id).filled(:int?)
      optional(:phone).filled(:phone?)
      optional(:id).filled
    end

    CreateCelebrity = Builder.(Base) do
      optional(:name).filled(:str?)
      required(:known_as).filled(:str?)
    end

    CreateFan = Builder.(Base) do
      required(:name).filled(:str?)
      optional(:known_as).filled(:str?)
    end
  end
end
