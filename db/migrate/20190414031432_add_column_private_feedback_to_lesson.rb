class AddColumnPrivateFeedbackToLesson < ActiveRecord::Migration[5.1]
  def change
    add_column :lessons, :private_feedback, :string
  end
end
