module Validators
  module MessageRequests
    ValidRecipientTypes = %w(me someone_else)

    Create = Dry::Validation.Params(Validators::Base) do
      required(:email_to,       DTypes::String).filled(:email?)
      required(:to,             DTypes::String).filled
      required(:brief,          DTypes::String).value(size?: 20..700)
      required(:celebrity_id,   DTypes::Integer).filled
      optional(:fan_id,         DTypes::Integer).filled
      optional(:from,           DTypes::String).value(:str?)

      required(:recipient_type, DTypes::String).filled(included_in?: ValidRecipientTypes)
        .when(eql?: 'someone_else')  { value(:from).filled? }

    end.with(object_class: :message_request)
  end
end
