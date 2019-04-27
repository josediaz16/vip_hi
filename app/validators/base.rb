module Validators
  class Base < Dry::Validation::Schema
    configure do
      # Use custom validation rules
      predicates ::Validators::Predicates
      # Remove any key that is not defined by the validator
      config.input_processor = :sanitizer
      # Use I18n as engine for error messages
      config.messages = :i18n
      # Use Dry::Types for validation and coercion
      config.type_specs = true

      option :object_class, :campaign
      option :model

      def provided?(value)
        value.present?
      end
    end
  end
end
