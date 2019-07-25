module CelebritySearchable
  extend ActiveSupport::Concern

  included do
    searchkick(
      callbacks: false,
      word_start: [:name, :known_as, :country],
      suggest: [:name, :known_as, :country],
      index_name: -> { "celebrities_#{Rails.env}" }
    )

    scope :search_import, -> { includes(user: :country) }

    def search_data
      {
        name: user.name,
        known_as: user.known_as,
        biography: biography,
        handle: handle,
        price: price,
        country: user.country.name,
        code_iso: user.country.code_iso,
        photo_url: Common::UploadUtils.get_attachment_url(user.photo),
        created_at: created_at
      }
    end
  end
end
