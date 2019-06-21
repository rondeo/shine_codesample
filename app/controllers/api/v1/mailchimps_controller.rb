class Api::V1::MailchimpsController < ApiController
  STATUS_SUBSCRIBED = "subscribed".freeze

  # create a new mailchimp signup
  def signup_newsletter
    pp params
    #return unless ENV['RAILS_ENV'] = "production"

    # need an API key too
    list_id_newsletter = ENV['MAILCHIMP_LIST_ID_NEWSLETTER']

    msg = nil
    status = nil

    begin
      Gibbon::Request.lists(list_id_newsletter)
        .members
        .create(
          body: {
            email_address: mailchimp_params[:email_address],
            status: STATUS_SUBSCRIBED,
            merge_fields: {
              FNAME: mailchimp_params[:first_name],
            },
          }
        )
      msg = "All right! You are now subscribed."
    rescue Gibbon::MailChimpError => e
      msg = "Good news! You are already subscribed."
    end

    render json: {message: msg}, status: 200
  end

  private

  def mailchimp_params
    params.require(:mailchimp).permit(
      :email_address,
      :first_name,
    )
  end
end
