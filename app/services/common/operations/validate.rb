require 'dry/transaction/operation'

module Common
  module Operations
    class Validate
      include Dry::Transaction::Operation
      include AppConfig::Import["validator"]

      def call(input)
        data = input.to_h
        result = validator.(data)

        if result.success?
          Success input.deep_merge(result.output)
        else
          Failure attributes: data, errors: result, object_class: validator.options[:object_class]
        end
      end
    end
  end
end
