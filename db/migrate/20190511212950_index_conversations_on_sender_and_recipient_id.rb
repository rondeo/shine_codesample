class IndexConversationsOnSenderAndRecipientId < ActiveRecord::Migration[5.1]
  def change
    add_index :conversations, [:sender_id, :recipient_id], unique: true
    add_index :conversations, [:recipient_id, :sender_id], unique: true
  end
end
