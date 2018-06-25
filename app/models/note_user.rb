class NoteUser < ApplicationRecord
  # associations
  belongs_to :user
  belongs_to :note

  enum role: [:reader, :updater, :owner]
end
