require 'dry-container'

module AppConfig
  class Container
    extend Dry::Container::Mixin
    register "get_content_from_record", -> model { model.content }
    register "validator",               -> input { Dry::Monads::Success.new input }

    register "role_name", "celebrity"
  end

  Import = Dry::AutoInject Container

  module ClassMethods
    def call(input)
      new.call(input)
    end
  end

  module InstanceMethods
    def call(input)
      super input, &Common::Utils.default_hooks
    end

    def to_proc
      -> input { self.(input) }
    end
  end

  class Transaction < Module
    def initialize(**options)
      @options = options
    end

    def included(base)
      base.include Dry::Transaction(**@options)
      base.prepend InstanceMethods
      base.extend  ClassMethods
    end
  end
end
