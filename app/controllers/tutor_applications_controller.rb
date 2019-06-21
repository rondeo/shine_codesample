class TutorApplicationsController < ApplicationController
  # would like to require_admin on :approve as well, but complex with token Auth
  # potential solution: move page to JS so can send headers; use JQuery/fetch in index view and set headers; etc
  before_action :require_admin!, only: [:index]

  def index
    tutors = User.tutors
    @total = tutors.count
    @in_last_week = tutors.in_last_week.count
    @unapproved = tutors.unapproved
  end

  def approve
    @user = User.find_by(id: params[:id])
    unless @user
      render status: 400, json: {
        message: 'User not found',
        user_id: params.id,
        errors: 'User not found'
      }
    end

    begin
      @user.approve!
      render status: 200, json: {
        message: "User #{@user.id} approved!",
        user: @user
      }
    rescue => e
      render status: 400, json: {
        message: 'Unable to approve user',
        user_id: @user.id,
        errors: @user.errors.full_messages << e
      }
    end
  end

  private

  def require_admin!
    authenticate_or_request_with_http_basic do |username, password|
      resource = AdminUser.find_by_email(username)
      sign_in :user, resource if resource && resource.valid_password?(password)
    end
  end
end
