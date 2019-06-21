# You can run these commands in separate shells
web: rails s -p $PORT

# no need for release phase to precompile assets for production as Heroku will do it if no Sprockets manifest is detected (public/assets/.sprockets-[hash]
# - https://github.com/rails/webpacker/issues/532 for details and debugging
#release: sh -c 'bundle && yarn install && rm -rf public/packs/* || true && bundle exec rake react_on_rails:locale assets:precompile'
release: rake db:migrate
