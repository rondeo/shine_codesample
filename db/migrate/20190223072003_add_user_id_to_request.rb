class AddUserIdToRequest < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :search_request_id, :integer
    add_column :search_requests, :user_id, :integer
  end
end
