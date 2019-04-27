module Validators
  module Predicates
    include Dry::Logic::Predicates

    predicate(:after_today?) do |value|
      value >= Time.now.beginning_of_day
    end

    predicate(:is_a_file?) do |value|
      value.is_a?(File) || value.is_a?(ActionDispatch::Http::UploadedFile)
    end
  end
end
