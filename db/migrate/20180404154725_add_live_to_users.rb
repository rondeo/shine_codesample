class AddLiveToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :live, :boolean
  end
end
