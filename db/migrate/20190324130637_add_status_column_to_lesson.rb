class AddStatusColumnToLesson < ActiveRecord::Migration[5.1]
  def change
    add_column :lessons, :status, :integer, default: Lesson.statuses[:pending]
  end
end
