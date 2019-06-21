source 'https://rubygems.org'
ruby "2.5.1"
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# core config
gem 'rails', '~> 5.1.4'
gem 'pg'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '>= 4.0.2'

# rails bonuses
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# ReactOnRails
# - allows us to combine Rails/React views
gem 'react_on_rails', '10.0.1'
# ReactOnRails: Prefer mini_racer to therubyracer as JS runtime
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'mini_racer', platforms: :ruby

# tools
gem 'devise', '>= 4.4.0'
gem 'devise_token_auth', '>= 0.1.43'
gem 'omniauth'
gem 'geocoder'
gem 'gibbon'  # mailchimp

# delayed jobs - sucker_punch for now; switch out under ActiveJob later
gem 'sucker_punch'

# shared
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'dotenv-rails'
end

# dev
group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'letter_opener'
  gem 'rubocop', '0.49.1', require: false

  gem 'guard', '>= 2.2.2', require: false
  gem 'guard-livereload', require: false
  gem 'rack-livereload'
  gem 'rb-fsevent', require: false
end

# test
group :test do
  gem 'database_cleaner'
  gem 'faker'
end

# idk Windows
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
#gem 'will_paginate', '~> 3.1.0'
gem 'activeadmin', '1.1'
gem 'rest-client'
gem 'stripe', '3.3.1'
gem 'paper_trail', '~> 8.1.1'
gem 'mailgun-ruby', '~>1.1.6'
gem 'paperclip'
gem 'aws-sdk-s3', '>= 1.8.2'

