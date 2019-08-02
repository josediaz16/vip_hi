module Celebrities
  class CompleteProfile
    include AppConfig::Transaction.new(container: Celebrities::Container)

    step :validate,         with: "ops.validate_complete_profile"
    map  :parse_input
    step :complete_profile, with: "ops.complete_celebrity_profile"
    tee  :update_photo
    tee  :index_on_es

    def parse_input(input)
      {original: input, attributes: input.slice(:biography, :price, :handle, :user_id)}
    end

    def update_photo(input)
      Common::UploadUtils.upload_file input.dig(:original, :photo), input[:model].user.photo, content_type: "image/*"
    end

    def index_on_es(input)
      input[:model].reindex
    end
  end
end
