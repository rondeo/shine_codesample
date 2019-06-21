class AddAddressInfoToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :street_address, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
  end
end
