class ChangeColumnToMessage < ActiveRecord::Migration[5.1]
  def change
  	remove_column :messages, :sender_id
  	remove_column :messages, :receiver_id
  	add_column :messages, :conversation_id, :integer, index: true
    add_column :messages, :user_id, :integer, index: true
    add_column :messages, :read, :boolean, default: false
  end
end
