class AddServiceRequestColumnToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :search_request_id, :integer
  end
end
