class AddExpressStateToUser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :express_state, :string
  end
end
