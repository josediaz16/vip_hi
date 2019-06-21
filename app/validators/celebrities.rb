module Validators
  module Celebrities
    Create = Dry::Validation.Params(Validators::Base) do
      required(:price, DTypes::Coercible::Float).filled(gt?: 0)
      required(:user_id, DTypes::Integer).filled
      optional(:biography, DTypes::String).filled
    end.with(object_class: :celebrity)
  end
end
