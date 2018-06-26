class Note < ApplicationRecord
  attr_accessor :creator

  # associations
  has_many :note_users, dependent: :destroy
  has_many :users, through: :note_users
  has_and_belongs_to_many :tags

  # callbacks
  after_create :create_note_user_for_creator

  def note_user_for(user)
    self.note_users.find_by(user: user)
  end

  def share(**args)
    self.note_users.create(user_id: args[:user_id], role: args[:role])
  end

  def revoke(user_id)
    self.note_users.find_by(user_id: user_id).destroy
  end

  def creator
    @creator ||= self.note_users.find_by(role: :creator)
  end

  private
    def create_note_user_for_creator
      self.note_users.create(user: creator, role: :creator)
    end
end
