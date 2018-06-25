class Note < ApplicationRecord
  # associations
  has_many :note_users
  has_many :users, through: :note_users
end
