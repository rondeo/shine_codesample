class SearchRequest < ApplicationRecord
  belongs_to :user

  validates :tutoring_type,
    :student_name,
    :subject,
    :price_range,
    :availability,
    :zip,
    :name,
    :email,
    :phone,
    #:user_type,
    #:grade,
    #:school,
    #:city,
    presence: true

  before_validation :update_user_info

  private

  def update_user_info
    user = User.find_by(email: email)

    if user.present?
      self.user = user
    else
      full_name = name.split(' ')
      user_info = { first_name: full_name.first,
                    last_name: full_name.last,
                    email: email,
                    phone_number: phone,
                    zip: zip,
                    student_name: student_name }

      learner = Learner.new(user_info)
      self.user = learner if learner.save
    end
  end
end
