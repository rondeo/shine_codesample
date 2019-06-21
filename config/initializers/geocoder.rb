# Geocoder config
# - https://github.com/alexreisner/geocoder#geocoding-service-lookup-configuration
Geocoder.configure(
  lookup: :google,
  # ip_lookup: :ipinfo_io,
  api_key: ENV['GOOGLE_API_KEY'],
  use_https: true
  #timeout: 3,
  #units: :km,
  #caching
)
