class AddNoteToTutorToPostings < ActiveRecord::Migration[5.1]
  def change
    add_column :postings, :tutor_note, :string
  end
end
