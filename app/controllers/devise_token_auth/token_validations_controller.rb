# frozen_string_literal: true

# NB - This file is a copy/paste of devise_token_auth's source code,
#       with modifications to render_validate_token_success

module DeviseTokenAuth
  class TokenValidationsController < DeviseTokenAuth::ApplicationController
    skip_before_action :assert_is_devise_resource!, only: [:validate_token]
    before_action :set_user_by_token, only: [:validate_token]

    def validate_token
      # @resource will have been set by set_user_by_token concern
      if @resource
        yield @resource if block_given?
        render_validate_token_success
      else
        render_validate_token_error
      end
    end

    protected

    # override to get custom return values
    # - https://github.com/lynndylanhurley/devise_token_auth/blob/master/docs/usage/overrides.md#overriding-rendering-methods
    # - TODO: May want to use block-passing so don't have to c/p the whole file:
    #   - https://github.com/lynndylanhurley/devise_token_auth/blob/master/docs/usage/overrides.md#passing-blocks-to-controllers
    def render_validate_token_success
      puts 'VALIDATE TOKEN'
      data = @resource.token_validation_response

      data['type'] = @resource.type
      data['hasStripeAccount'] = @resource.has_stripe_account
      data['client'] = params['client']
      data['accessToken'] = @token
      data['stripeExpressOauthUrl'] = ENV['STRIPE_EXPRESS_OAUTH_URL']
      data['stripeExpressOauthRedirectUrl'] = ENV['STRIPE_EXPRESS_OAUTH_REDIRECT_URL']
      data['stripeClientId'] = ENV['STRIPE_CLIENT_ID']
      data['stripePublishId'] = ENV['STRIPE_PUBLISHER_KEY']
      data['createdAt'] = @resource.created_at
      data['hourlyRateCents'] = @resource.hourly_rate_cents
      data['imageUrl'] = @resource.image_url

      render json: {
        success: true,
        data: resource_data(resource_json: data)
      }
    end

    def render_validate_token_error
      render_error(401, I18n.t('devise_token_auth.token_validations.invalid'))
    end
  end
end
