class AddTutorColumnsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :gender, :string
    add_column :users, :travel_distance, :integer
  end
end
