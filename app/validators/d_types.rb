module Validators
  module DTypes
    include Dry::Types.module
    DB_PHONE_FORMAT = /(?:\+\d{2}(?: |)|[\D])/

    Phone = DTypes::String.constructor do |value|
      value.gsub(DB_PHONE_FORMAT, "")
    end
  end
end
