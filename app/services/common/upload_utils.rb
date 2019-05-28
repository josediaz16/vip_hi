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
  end
end
