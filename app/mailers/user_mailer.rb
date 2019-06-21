class UserMailer < ApplicationMailer
  STAGING_URL = 'https://shine-stg.herokuapp.com/'.freeze
  DOMAIN_URL = ENV['HEROKU_URL'] || STAGING_URL

  default from: 'no-reply@shinetutors.co',
          reply_to: 'info@shinetutors.co'

  def welcome_email(user_id)
    @user = User.find(user_id)
    @profile_url = "#{UserMailer::DOMAIN_URL}tutor/#{user_id}"
    @login_url = UserMailer::DOMAIN_URL.to_s
    @tutor_account_page_url = "#{UserMailer::DOMAIN_URL}account"
    @token = @user.send(:set_reset_password_token)
    @redirect_url = "#{UserMailer::DOMAIN_URL}set-password"

    mail(
      to: @user.email,
      from: 'frank@shinetutors.co',
      subject: '[Shine] Your Tutoring Application has been approved!'
    )
  end

  def welcome_parent_email(user_id)
    @user = User.find(user_id)
    @token = @user.send(:set_reset_password_token)
    @redirect_url = "#{UserMailer::DOMAIN_URL}set-password"
    @account_url = "#{UserMailer::DOMAIN_URL}account"

    mail(
      to: @user.email,
      from: 'frank@shinetutors.co',
      subject: '[Shine Tutors] Welcome to Shine!'
    )
  end

  def registration_email(user_id)
    @user = User.find(user_id)
    # @profile_url = "#{UserMailer::DOMAIN_URL}tutor/#{user_id}"
    # @login_url = UserMailer::DOMAIN_URL.to_s
    # @tutor_account_page_url = "#{UserMailer::DOMAIN_URL}account"

    mail(
      to: @user.email,
      subject: "[Shine] We're reviewing your Tutor Profile!"
    )
  end

  def reference_email(ref_id)
    reference = Reference.find(ref_id)
    @ref_name = reference.first_name
    @user = reference.user
    @personal_note = reference.personal_note
    @profile_url = "#{UserMailer::DOMAIN_URL}tutor/#{reference.uuid}/new-reference"

    mail(
      to: reference.email,
      subject: "#{@user.name} has listed you as a tutoring reference!",
    )
  end

  def reminder_email_to_reference(reference)
    @ref_name = reference.first_name
    @personal_note = reference.personal_note
    @tutor = reference.user
    @profile_url = "#{UserMailer::DOMAIN_URL}tutor/#{@tutor.id}?ref=#{reference.id}"

    mail(
      to: reference.email,
      subject: "#{@tutor.name} has listed you as a tutoring reference!"
    )
  end

  def msg_email(user_id, receiver_id, msg)
    @sender = User.find(user_id)
    @receiver = User.find(receiver_id)
    @msg = msg
    @messages_url = "#{UserMailer::DOMAIN_URL}messages"

    mail(
      to: @receiver.email,
      subject: "[Shine Tutors] You have a new message from #{@sender.name}!"
    )
  end

  def hiring_email(id)
    @hiring_request = HiringRequest.find(id)
    @parent = @hiring_request.learner
    @tutor = @hiring_request.tutor
    @lessons_url = "#{UserMailer::DOMAIN_URL}lessons"

    mail(
      to: @tutor.email,
      bcc: "frank@shinetutors.co",
      subject: "[Shine] Congratulations! #{@parent.first_name} would love to work with you!"
    )
  end

  def payment_failure_email(parent_id, tutor_id)
    @parent = User.find(parent_id)
    @tutor = User.find(tutor_id)
    @msg_url = "#{UserMailer::DOMAIN_URL}message"
    @parent_account_page_url = "#{UserMailer::DOMAIN_URL}account"
    mail(
      to: @parent.email,
      subject: '[Shine] Whoops! Looks like your credit card expired.'
    )
  end

  def lesson_approval_email(lesson_id)
    @lesson = Lesson.find(lesson_id)
    @learner = @lesson.learner
    @tutor = @lesson.tutor
    @lesson_url = "#{UserMailer::DOMAIN_URL}lessons"

    mail(
      to: @learner.email,
      subject: "[Shine] Please approve your lesson with #{@tutor.first_name} on #{@lesson.lesson_date.strftime("%-m/%-d")}."
    )
  end

  def lesson_rejection_email(lesson_id)
    @lesson = Lesson.find(lesson_id)
    @learner = @lesson.learner
    @tutor = @lesson.tutor
    @lesson_url = "#{UserMailer::DOMAIN_URL}lessons"
    @messages_url = "#{UserMailer::DOMAIN_URL}messages"

    mail(
      to: @tutor.email,
      subject: "[Shine] Oops! Your tutoring session with #{@learner.first_name} was rejected."
    )
  end
end
