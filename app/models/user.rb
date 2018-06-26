class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # associations
  has_many :note_users
  has_many :notes, through: :note_users

  # validations
  validates :name, presence: true, uniqueness: true
end
