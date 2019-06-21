class AddAcceptingNewStudentsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :accepting_new_students, :boolean
    add_index :users, :accepting_new_students
  end
end
