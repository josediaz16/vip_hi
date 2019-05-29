require 'dry/monads/maybe'

module Common
  module UploadUtils
    # This is the base function to upload a file.
    def self.upload_file(file, uploadable, content_type: 'application/json')
      if file.kind_of?(IO)
        uploadable.attach(io: file, filename: File.extname(file.path))
      elsif file.is_a?(Tempfile)
        uploadable.attach(io: file, filename: file.path, content_type: content_type)
      elsif file.present?
        uploadable.attach(file)
      end
    end

    def self.get_attachment_url(attachment)
      Dry::Monads.Maybe(attachment)
        .fmap { |value| value.attached?.presence }
        .fmap { Rails.application.routes.url_helpers.rails_blob_path(attachment, only_path: true) }
        .value_or("")
    end
  end
end
