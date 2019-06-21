class AddEntityCountColumnToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :lesson_count, :integer
    add_column :users, :reference_count, :integer
    add_column :users, :up_rating_count, :integer
  end
end
