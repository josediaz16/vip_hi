class Role < ApplicationRecord
  VALID_ROLES = ['celebrity', 'admin', 'fan']

  validates :name, presence: true, inclusion: { in: VALID_ROLES }

  has_many :user_roles

  def self.names_ordered
    order(:name).pluck(:name)
  end
end
