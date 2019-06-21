module Overrides
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    def create
      super
    end

    protected

    def render_create_success
      data = resource_data

      if @resource.approved?
        data['type'] = @resource.type
        data['client'] = @client_id
        data['accessToken'] = @token
        data['hasStripeAccount'] = @resource.has_stripe_account
        data['stripeExpressOauthUrl'] = ENV['STRIPE_EXPRESS_OAUTH_URL']
        data['stripeExpressOauthRedirectUrl'] = ENV['STRIPE_EXPRESS_OAUTH_REDIRECT_URL']
        data['stripeClientId'] = ENV['STRIPE_CLIENT_ID']
        data['stripePublishId'] = ENV['STRIPE_PUBLISHER_KEY']
        data['createdAt'] = @resource.created_at
        data['hourlyRateCents'] = @resource.hourly_rate_cents
        data['imageUrl'] = @resource.image_url
      else
        data = {}
      end

      render json: {
        data: data
      }
    end
  end
end
