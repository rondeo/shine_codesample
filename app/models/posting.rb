class Posting < ApplicationRecord
  validates :area, presence: true
  validates :subject, presence: true
  validates :subject_grade_level, presence: true
  validates :price_point, presence: true
  validates :start_date, presence: true
  validates :parent_name, presence: true
  # student's name can be same as parent's - sName is optional
  # validates :student_name
  # validates :email, presence: true

  has_many :posting_recipients
  has_many :recipients, class_name: 'User', through: :posting_recipients, source: :user

  scope :in_last_week, -> { where('created_at >= ?', 1.week.ago) }
  scope :with_recipients, -> { left_joins(:posting_recipients).group(:id).having('COUNT(posting_recipients.id) > 0') }
  scope :no_recipients, -> { left_joins(:posting_recipients).group(:id).having('COUNT(posting_recipients.id) = 0') }
  scope :needs_recipients, -> { left_joins(:posting_recipients).group(:id).having('COUNT(posting_recipients.id) < 5') }

  def recommended_tutors
    # User.where(
    # ZIP within 5 miles
    # price range within +/- $10
    # subjects.include (subject)

    # use a bunch of scopes and chain them
    # ).limit(10)
    User
      .select(:id, :name)
      .with_price(price_point.to_f)
      .with_subject(subject, subject_grade_level)
      .with_area(area.to_i)
      .limit(10)
  end
end
