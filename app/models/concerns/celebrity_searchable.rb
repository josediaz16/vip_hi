module CelebritySearchable
  extend ActiveSupport::Concern

  included do
    searchkick(
      callbacks: false,
      word_start: [:name, :known_as, :country],
      suggest: [:name, :known_as, :country]
    )

    scope :search_import, -> { includes(user: :country) }

    def search_data
      {
        name: user.name,
        known_as: user.known_as,
        biography: biography,
        country: user.country.name,
        code_iso: user.country.code_iso,
        photo_url: Rails.application.routes.url_helpers.rails_blob_path(user.photo, only_path: true)
      }
    end
  end
end
