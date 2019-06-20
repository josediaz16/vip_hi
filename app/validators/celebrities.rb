module Validators
  module Celebrities
    Create = Dry::Validation.Params(Validators::Base) do
      required(:price, DTypes::Float).filled(gt?: 0)
      required(:user_id, DTypes::Integer).filled
      optional(:biography, DTypes::String).filled
    end
  end
end
