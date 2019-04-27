require 'dry-container'

module AppConfig
  class Container
    extend Dry::Container::Mixin
    register "get_content_from_record", -> model { model.content }
    register "validator",               -> input { Dry::Monads::Success.new input }
  end

  Import = Dry::AutoInject Container

  module ClassMethods
    def call(input)
      new.call(input)
    end
  end

  class Transaction < Module
    def initialize(**options)
      @options = options
    end

    def included(base)
      base.include Dry::Transaction(**@options)
      base.extend  ClassMethods
    end
  end
end