class AddHiringRequestIdToConversations < ActiveRecord::Migration[5.1]
  def change
    add_reference :conversations, :hiring_request, foreign_key: true
  end
end
