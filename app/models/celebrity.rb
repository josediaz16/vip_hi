class Celebrity < ApplicationRecord
  include CelebritySearchable

  belongs_to :user
end
