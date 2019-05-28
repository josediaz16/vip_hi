require 'dry/monads/maybe'

module Users
  class Create
    include AppConfig::Transaction.new container: Users::Container

    map  :find_country, with: "ops.find_country"
    step :validate,     with: "ops.validate"
    map  :parse_input,  with: "ops.default_parse_input"
    step :persist,      with: "ops.persist"
    tee  :attach_photo

    def attach_photo(input)
      Common::UploadUtils.upload_file input.dig(:original, :photo), input[:model].photo, content_type: "image/*"
    end

  end
end
