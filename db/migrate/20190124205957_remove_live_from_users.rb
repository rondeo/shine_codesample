class RemoveLiveFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :live, :boolean
  end
end
