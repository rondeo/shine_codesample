class AddRetryPaymentCountToLesson < ActiveRecord::Migration[5.1]
  def change
  	add_column :lessons, :retry_count, :integer, default: 0
  	add_column :lessons, :retry_set, :integer, default: 1
  end
end
