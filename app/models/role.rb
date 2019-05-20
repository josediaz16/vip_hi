class Role < ApplicationRecord
  VALID_ROLES = ['celebrity', 'admin']

  validates :name, presence: true, inclusion: { in: VALID_ROLES }

  has_many :user_roles

end
