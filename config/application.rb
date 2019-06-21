require_relative 'boot'
require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'

# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Tutorbook
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # CORS config for token auth
    # - no need for CORS, as our API and SPA servers are on the same URL
    # - this will allow our SPA to send devise-token-auth headers to the auth server (if separated)
    #   - https://github.com/lynndylanhurley/devise_token_auth/blob/master/docs/config/cors.md
    # - make sure to set withCredentials on the axios side:
    #   - https://www.html5rocks.com/en/tutorials/cors/
    #config.middleware.use Rack::Cors do
    #  allow do
    #    origins '*'
    #    resource '*',
    #      :headers => :any,
    #      :expose  => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
    #      :methods => [:get, :post, :delete, :put, :options]
    #  end
    #end

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.active_job.queue_adapter = :sucker_punch
  end
end
