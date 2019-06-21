class AddColumnLast4ToUser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :brand, :string
  	add_column :users, :last4, :string
  end
end
