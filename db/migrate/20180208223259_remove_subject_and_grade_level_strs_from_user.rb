class RemoveSubjectAndGradeLevelStrsFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :subject
    remove_column :users, :subject_grade_level
  end
end
