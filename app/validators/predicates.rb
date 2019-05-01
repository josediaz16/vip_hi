module Validators
  module Predicates
    include Dry::Logic::Predicates

    predicate(:after_today?) do |value|
      value >= Time.now.beginning_of_day
    end

    predicate(:is_a_file?) do |value|
      value.is_a?(File) || value.is_a?(ActionDispatch::Http::UploadedFile)
    end

    predicate(:email?) do |value|
      ! /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/.match(value).nil?
    end

    predicate(:phone?) do |value|
      ! /\A(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\z/.match(value).nil?
    end
  end
end
