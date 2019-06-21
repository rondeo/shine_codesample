class AddColumnToCharge < ActiveRecord::Migration[5.1]
  def change
  	add_column :charges, :failure_code, :string
  	add_column :charges, :failure_message, :string
  	add_column :lessons, :payment_status, :integer
  end
end
