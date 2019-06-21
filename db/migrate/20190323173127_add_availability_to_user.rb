class AddAvailabilityToUser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :availability, :text, array: true, default: []
  end
end
