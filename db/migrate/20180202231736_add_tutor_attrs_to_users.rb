class AddTutorAttrsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :zip, :string
    add_column :users, :subject, :string
    add_column :users, :subject_grade_level, :string
    add_column :users, :bio, :string
    add_column :users, :desc_tutoring_style, :string
    add_column :users, :references_str, :string
    add_column :users, :hourly_rate_cents, :integer
  end
end
