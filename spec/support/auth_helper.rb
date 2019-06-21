# Auth helpers for devise_token_auth testing
# https://github.com/lynndylanhurley/devise_token_auth/issues/521
# See also: https://github.com/lynndylanhurley/devise_token_auth/issues/75

module AuthHelper
  module Controller
    def sign_in(user)
      @request.env["devise.mapping"] = Devise.mappings[:merchant]

      @request.headers.merge! user.create_new_auth_token
      sign_in user
    end
  end

  module Request
    %i(get post put patch delete).each do |http_method|
      # auth_get, auth_post, auth_put, auth_patch, auth_delete
      define_method("auth_#{http_method}") do |user, action_name, mode: 'token', params: {}, headers: {}|
        if mode == 'token'
          auth_headers = user.create_new_auth_token
        elsif mode == 'http'
          auth_headers = { HTTP_AUTHORIZATION: ActionController::HttpAuthentication::Basic.encode_credentials(user.email,user.password) }
        end
        headers = headers.merge(auth_headers)
        public_send(http_method, action_name, params: params, headers: headers)
      end
    end
  end
end

RSpec.configure do |config|
  config.include AuthHelper::Controller, type: :controller
  config.include AuthHelper::Request, type: :request
end
