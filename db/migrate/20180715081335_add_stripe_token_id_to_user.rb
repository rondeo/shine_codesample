class AddStripeTokenIdToUser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :stripe_token_id, :string
  end
end
