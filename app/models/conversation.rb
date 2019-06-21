class Conversation < ApplicationRecord
  belongs_to :sender, foreign_key: :sender_id, class_name: :User
  belongs_to :recipient, foreign_key: :recipient_id, class_name: :User
  belongs_to :hiring_request, optional: true

  has_many :messages, dependent: :destroy

  validates_uniqueness_of :sender_id, scope: :recipient_id

  scope :for_user, -> (user_id) do
    where('sender_id = ? OR recipient_id = ?', user_id, user_id)
      .order('updated_at DESC')
  end

  scope :between, ->(sender_id, recipient_id) do
    where(
      '(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)',
      sender_id, recipient_id,
      recipient_id, sender_id
    )
  end

  def self.fetch_conversation(sender_id, recipient_id)
    conversation = if Conversation.between(sender_id, recipient_id).any?
                      conv = Conversation.between(sender_id, recipient_id).first
                      conv.touch
                      conv
                    else
                      Conversation.create!(sender_id: sender_id, recipient_id: recipient_id)
                    end
    conversation
  end

  def received_messages(user)
  	messages.where.not(user_id: user.id)
  end

  def latest_messages
  	messages.order(created_at: :asc)
  end
end
