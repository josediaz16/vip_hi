module Common
  module Utils
    # Default Behaviour for Dry Transactions.
    # Return original success value or parse the errors
    # in the same format.

    FailureHook = ->  error do
      errors, object_class = error.slice(:errors, :object_class).values
      Dry::Monads::Failure.new errors: Errors::Parser.detect(errors, object_class).parse
    end

    def self.default_hooks
      -> transaction do
        transaction.success { |value| Dry::Monads::Success.new value }
        yield(transaction) if block_given?
        transaction.failure &FailureHook
      end
    end
  end
end
