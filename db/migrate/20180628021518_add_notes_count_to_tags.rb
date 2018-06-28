class AddNotesCountToTags < ActiveRecord::Migration[5.2]
  def change
    add_column :tags, :notes_count, :integer
  end
end
