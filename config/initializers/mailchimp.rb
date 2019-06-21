# config for the Gibbon (mailchimp API) gem
# - https://github.com/amro/gibbon

Gibbon::Request.api_key = ENV['MAILCHIMP_API_KEY']
Gibbon::Request.symbolize_keys = true
