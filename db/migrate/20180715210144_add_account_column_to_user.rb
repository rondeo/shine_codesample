class AddAccountColumnToUser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :stripe_account_id, :string
  	add_column :users, :strpe_authorization_code, :string
  end
end
