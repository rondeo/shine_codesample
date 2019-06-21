class AddPayoutAmountToCharge < ActiveRecord::Migration[5.1]
  def change
    add_column :charges, :payout_amount, :decimal
    add_column :charges, :payout_percentage, :decimal
  end
end
