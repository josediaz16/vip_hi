module Validators
  Builder = -> base_schema, &block do
    Dry::Validation.Params(Validators::Base) do
      instance_eval(&base_schema)
      instance_eval(&block) if block.present?
    end
  end
end
