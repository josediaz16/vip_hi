require 'dry/transaction/operation'

module Common
  module Operations
    PersistBuilder = -> prepare_model do

      Class.new do
        include Dry::Transaction::Operation
        include AppConfig::Import["model_class"]

        define_method :call do |input|
          attributes = input[:attributes]
          model = prepare_model.(model_class, attributes)

          if model.save
            Success input.merge(model: model)
          else
            Failure model: model, errors: model.errors, attributes: attributes
          end
        end
      end

    end
  end
end
