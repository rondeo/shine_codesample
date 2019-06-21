class ApiController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken

  def get_current_user
    return nil if request.headers['uid'].blank?
    User.find_by_email(request.headers['uid'])
  end

  def current_user
    current_api_v1_user
  end
end
