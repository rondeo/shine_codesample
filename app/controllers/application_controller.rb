class ApplicationController < ActionController::Base
  include ReactOnRails::Controller

  protect_from_forgery with: :exception

  # Allow multiple login/logout requests from the same client.
  # See: https://github.com/lynndylanhurley/devise_token_auth/issues/398
  #   for problem description.
  # Solution: override protect_from_forgery for JSON requests (API requests)
  # TODO: For protected areas (eg, Non-API: User Data), we have to manually protect
  #       the user's data. So things like getting user account info
  #       (vs updating passwords, which is handled by devise_token_auth securely - )
  #       - we'd have to protect against the data being publicly accessible/modifiable.
  #       This could be best done with some sort of authentication, or user check.
  #       For now, default to treating everything as an API
  #       - only allow requests from our app (CSRF)
  #       - for things like fetching user data (other than returned by userAttrs in login),
  #         we will have to find some way to check the user
  #       - see if we can use login (currentUser) data to populate all account request info
  #       - what about account update (PUT)?
  #         Solution: devise_token_auth provides PUT route that requires password
  #         Solution: do all User info updates through devise_token_auth
  #         (Profiles and other such data can be updated publicly --
  #           OR by adding a new devise_token_auth method that checks the current user
  #           against the updated profile.
  #           See: https://github.com/lynndylanhurley/devise_token_auth#devisetokenauthconcernsuser
  #         )
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }

  before_action :configure_permitted_parameters, if: :devise_controller?

  after_action ->() {
    if request.format.json? && params[:redirect_url].blank? && Rails.env.development?
      pp "RESPONSE!"
      pp "*" * 100
      pp response.headers
      pp response.body
      pp JSON.parse response.body if response.body && response.body.length > 0
      pp "*" * 100
    end
  }

  private

  def initialize_shared_store
    redux_store('Store', props: {})
  end

  def normalize_keys!(val = params)
    if val.class == Array
      val.map { |v| normalize_keys! v }
    else
      if val.respond_to?(:keys)
        val.keys.each do |k|
          current_key_value = val[k]
          val.delete k
          val[k.to_s.underscore] = normalize_keys!(current_key_value)
        end
      end
      val
    end
    val
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [
        :type,
        :first_name,
        :last_name,
        :accept_tos,
        :avatar,
        :zip,
        :subject,
        :years_exp,
        :subject_qualifications,
        :hourly_rate_cents,
        :bio,
        :desc_tutoring_style,
        :image,
        :resume,
        :years_exp,
        :references_str,
        :why_tutor,
        :tag_line,
        :reference_personal_note,
        :travel,
        :phone_number,
        :accept_tos,
        :approved,
        subjects_attributes: %i[
          id
          name
          grade_level
          _destroy
        ],
        educations_attributes: %i[
          id
          degree
          course
          institute
          _destroy
        ],
        references_attributes: %i[
          id
          first_name
          last_name
          title
          email
          personal_note
          _destroy
        ]
      ]
    )
    devise_parameter_sanitizer.permit(
      :validate_token,
      keys: [
        :uid,
        :client,
        'access-token'
      ]
    )
  end
end
