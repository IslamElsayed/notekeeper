class User < ApplicationRecord
  # associations
  has_many :note_users
  has_many :notes, through: :note_users

  # validations
  validates :name, presence: true, uniqueness: true
end
