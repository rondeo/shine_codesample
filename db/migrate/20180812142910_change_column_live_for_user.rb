class ChangeColumnLiveForUser < ActiveRecord::Migration[5.1]
  def change
  	change_column :users, :live, :string
  end
end
