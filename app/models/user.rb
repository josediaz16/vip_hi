class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable,
    :confirmable

  belongs_to :country

  has_one  :admin
  has_one  :celebrity
  has_one  :fan

  has_many :user_roles
  has_many :roles, through: :user_roles

  has_one_attached :photo
end
