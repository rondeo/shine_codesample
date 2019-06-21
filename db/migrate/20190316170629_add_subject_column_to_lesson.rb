class AddSubjectColumnToLesson < ActiveRecord::Migration[5.1]
  def change
    add_column :lessons, :minutes, :integer
    add_column :lessons, :subject, :string
  end
end
