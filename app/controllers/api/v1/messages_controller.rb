require 'securerandom'

class Api::V1::MessagesController < ApiController
  before_action :authenticate_api_v1_user!, except: %i[create]

  def index
    render json: fetch_conversation
  end

  def conv_messages
    conversation = Conversation.find(params[:id])
    conversation.received_messages(current_user).update_all(read: true)

    render json: {
      coversations: conversation.latest_messages.map(&:message_json),
      is_hired: HiringRequest.is_hired(conversation.sender_id, conversation.recipient_id),
      other_user: current_user.id === conversation.sender_id ? conversation.recipient : conversation.sender,
    }
  end

  def create_bck
    message = Message.new(msg_params)

    recipient_id = params[:recipient_id]
    message.conversation_id = Conversation.fetch_conversation(current_user.id, recipient_id).id
    message.user_id = current_user.id

    if message.save
      render json: {
        message: message,
        conversations: fetch_conversation,
      }
    else
      render json: message.errors, status: 422
    end
  end

  def create
    message = Message.new(msg_params)
    recipient_id = params[:recipient_id]

    if current_user.blank?
      password = SecureRandom.hex(6)
      user = Learner.new(user_params)
      user.approved = true
      user.password = password

      if user.save
        user.send_parent_approval_email!
        sender_id = user.id
      else
        render json: user.errors.full_messages, status: 422
        return
      end
    else
      sender_id = current_user.id
    end

    message.conversation_id = Conversation.fetch_conversation(sender_id, recipient_id).id
    message.user_id = sender_id

    if message.save
      render json: {
        message: message,
        conversations: current_user.present? ? fetch_conversation : [],
      }
    else
      render json: message.errors, status: 422
    end
  end

  private

  def fetch_conversation
    @conversations = Conversation
      .for_user(current_user.id)
      .limit(10)

    conversations = []
    other_users = []

    @conversations.each_with_index do |conv, index|
      # display conversations from sender perspective?
      # - suggest: this may be better to compare the user_ids on the frontend, since display order (L or R side) is essentially a View concern
      sender = current_user
      other_user = current_user.id == conv.sender_id ? conv.recipient : conv.sender
      other_users << other_user.id
      conversation = {}
      conversation[:id] = conv.id
      conversation[:updated_at] = conv.updated_at
      conversation[:content] = conv.messages.last || {}
      conversation[:other_user] = other_user.profile_json
      conversation[:is_hired] = !!conv.hiring_request_id
      conversation[:sender] = sender.id == params[:id].to_i ? 'You' : sender.first_name
      conversation[:messages_count] = conv.received_messages(current_user).unread.count
      conversation[:messages] = conv.latest_messages.map(&:message_json) if index.zero?
      conversations << conversation
    end

    other_users = if current_user.is_a? Teacher
                    Learner.where.not(id: other_users)
                  # else
                    # Teacher.where.not(id: other_users)
                  end

    return conversations if other_users.blank?

    other_users = other_users
      .approved
      .order(updated_at: :desc)
      .limit(10)

    other_users.each do |other_user|
      conversation = {}
      conversation[:id] = nil
      conversation[:other_user] = other_user.profile_json
      conversation[:content] = { content: '' }
      conversation[:messages_count] = 0
      conversation[:messages] = []
      conversations << conversation
    end
    conversations
  end

  def msg_params
    params.require(:message).permit(:user_id, :content)
  end

  def conversation(sender_id, recipient_id)
    @conversation = if Conversation.between(sender_id, recipient_id).present?
                      conv = Conversation.between(sender_id, recipient_id).first
                      conv.touch
                      conv
                    else
                      Conversation.create!(sender_id: sender_id, recipient_id: recipient_id)
                    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email)
  end
end
