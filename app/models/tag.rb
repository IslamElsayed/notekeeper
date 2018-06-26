class Tag < ApplicationRecord
  # associations
  has_and_belongs_to_many :notes

  # validations
  validates :name, presence: true, uniqueness: true
end
