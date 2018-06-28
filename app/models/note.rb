class Note < ApplicationRecord
  attr_accessor :creator

  # associations
  has_many :note_users, dependent: :destroy
  has_many :users, through: :note_users
  has_and_belongs_to_many :tags, after_add: :increment_tag_notes_count, after_remove: :decrement_tag_notes_count

  # callbacks
  after_create :create_note_user_for_creator

  # validations
  validates :title, presence: true
  validates :body, presence: true

  def note_user_for(user)
    self.note_users.find_by(user: user)
  end

  def share(args)
    self.note_users.create(user_id: args[:user_id], role: args[:role])
  end

  def revoke(user)
    self.note_users.find_by(user: user).destroy
  end

  def creator
    @creator ||= self.note_users.find_by(role: :creator).user
  end

  private
    def create_note_user_for_creator
      self.note_users.create(user: creator, role: :creator)
    end

    def increment_tag_notes_count(tag)
      tag.increment!(:notes_count)
    end

    def decrement_tag_notes_count(tag)
      tag.decrement!(:notes_count)
    end
end
