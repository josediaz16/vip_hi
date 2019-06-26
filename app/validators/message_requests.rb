module Validators
  module MessageRequests
    Create = Dry::Validation.Params(Validators::Base) do
      required(:email_to,     DTypes::String).filled(:email?)
      required(:to,           DTypes::String).filled
      required(:brief,        DTypes::String).value(size?: 20..700)
      required(:celebrity_id, DTypes::Integer).filled
      required(:fan_id,       DTypes::Integer).filled
      optional(:from,         DTypes::String).value(:str?)
    end.with(object_class: :message_request)
  end
end
