class AddStudentColumnToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :student_name, :string
  end
end
