class CreateNoteUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :note_users do |t|
      t.integer :role
      t.references :user
      t.references :note

      t.timestamps
    end
  end
end
