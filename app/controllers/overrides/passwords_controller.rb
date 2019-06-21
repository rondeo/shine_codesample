module Overrides
  class PasswordsController < DeviseTokenAuth::PasswordsController
    def create
      user = User.find_by(email: params[:email])
      if user.present? && !user.approved?
        render_error(401, I18n.t('devise_token_auth.sessions.inactive', email: user.email))
      else
        super
      end
    end
  end
end
