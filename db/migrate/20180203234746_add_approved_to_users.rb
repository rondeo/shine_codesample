class AddApprovedToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column    :users, :approved,  :boolean, default: false
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    remove_column :users, :name,      :string
  end
end
