class AddAcceptTosToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :accept_tos, :boolean
  end
end
