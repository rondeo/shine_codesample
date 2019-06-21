class Message < ApplicationRecord
  belongs_to :conversation, touch: true
  belongs_to :user
  # prefer after_commit to after_create to ensure :id field is present (committed) to DB
  after_commit :send_email, on: :create, unless: :has_recent_message?

  validates_presence_of :content, :conversation_id, :user_id

  scope :unread, ->() {
    where(read: false)
  }
  scope :from_user, ->(user_id) {
    where(user_id: user_id)
  }

  def date
    created_at.strftime("%m/%d/%y")
  end

  def user_data
    user.profile_json
  end

  def message_json
    as_json(
      include: {
        user: {
          only: [:id],
          methods: %i[image_url]
        },
      },
      methods: [
        :date
      ],
      only: %i[
        id
        content
        conversation_id
        created_at
        user_id
      ]
    )
  end

  private

  # TODO: this should possibly be in Conversation, for knowledge of last message time
  def has_recent_message?
    prev_messages = conversation
      .messages
      .from_user(self.user_id)
      .order(created_at: :desc)
      .limit(2)
    # the last message is the first by created_at
    prev_message = prev_messages.last

    # has a recent message, excluding self, and
    # previous message is greater than 30 minutes ago
    return (
      self.id != prev_message.id &&
      (self.created_at.utc - prev_message.created_at.utc) <= 30.minutes.to_i
    )
  end

  def send_email
    recipient_id = self.user_id == conversation.sender_id ? conversation.recipient_id : conversation.sender_id

    SendMessageEmailJob.perform_later(user_id, recipient_id, content)
  end
end
