module Errors
  module Utils

    SimpleError = -> error, *args, &block do
      object_class, field, code, value, description = error.split(";")
      Errors::Simple.new(object_class: object_class, field: field, code: code, description: description, value: value, &block)
    end

    AmError = -> error, *args, &block do
      Errors::AmError.new(error, &block)
    end

    DryError = -> error, object_class, &block do
      Errors::DryResult.new(error, object_class)
    end

    ErrorOptions = {
      ActiveModel::Errors => AmError,
      String => SimpleError,
      Dry::Validation::Result => DryError
    }

    # Returns a new specialized error based on the class of the original error.
    def self.detect(error, *args, &block)
      ErrorOptions[error.class].(error, *args, &block)
    end
  end
end
