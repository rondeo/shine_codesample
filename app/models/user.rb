class User < ApplicationRecord
  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  TYPE_TEACHER = 'Teacher'.freeze
  TYPE_LEARNER = 'Learner'.freeze
  TYPE_ADMIN = 'Admin'.freeze

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable,
         :omniauthable

  include DeviseTokenAuth::Concerns::User

  has_one :preferred_subject, class_name: 'Subject'
  has_many :subjects
  has_many :references
  has_many :confirmed_references, -> { where(confirmed: true) }, class_name: 'Reference'
  has_many :given_references, class_name: 'Reference', foreign_key: :referenced_by, inverse_of: :reporter
  has_many :educations
  has_many :posting_recipients
  has_many :postings, through: :posting_recipients
  has_many :students, class_name: 'HiringRequest', foreign_key: :tutor_id
  has_many :tutors, class_name: 'HiringRequest', foreign_key: :learner_id
  has_many :hiring_requests, foreign_key: :learner_id, dependent: :destroy
  has_many :search_requests

  # alias_attribute :image_url, :image
  alias_attribute :stripe_authorization_code, :strpe_authorization_code

  accepts_nested_attributes_for :subjects, allow_destroy: true
  accepts_nested_attributes_for :references, allow_destroy: true
  accepts_nested_attributes_for :educations, allow_destroy: true

  validates :undergrad_degree, length: { minimum: 1 }, allow_nil: true
  validates :undergrad_school, length: { minimum: 1 }, allow_nil: true
  validates :grad_degree, length: { minimum: 1 }, allow_nil: true
  validates :grad_school, length: { minimum: 1 }, allow_nil: true

  after_validation :geocode, if: ->(obj) { obj.zip.present? && obj.zip_changed? }
  before_validation :set_default_type, on: :create
  before_validation :set_default_password, on: :create
  before_create :set_approved_for_user
  before_create :set_uuid
  after_create :send_email
  after_commit :send_email_to_reference, on: :create

  geocoded_by :zip

  has_attached_file :avatar, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  },
  default_url: ''

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  # some crazy ZIP matching action
  scope :with_area, ->(zip, radious = nil) {
    # get geocoordinates
    # translate geocoords + 5-10mi into zip codes
    # see if our zip is included in those ZIPs

    # for now, see if is a Bay Area ZIP
    radious ||= 10
    near(zip, radious)
  }
  scope :with_price, ->(low, hi) {
    where('hourly_rate_cents >= ? AND hourly_rate_cents <= ?', low * 100, hi * 100)
  }
  scope :with_subject, ->(subject) { where(subject: subject) }
  scope :tutors, -> { where(type: TYPE_TEACHER) }
  scope :approved, -> { where(approved: true) }
  scope :approved_with_bank_info, ->() { approved.where('stripe_account_id IS NOT NULL') }
  scope :with_avatar, -> { where('avatar_file_name IS NOT NULL') }
  scope :with_hourly_rate, -> { where('hourly_rate_cents IS NOT NULL') }
  scope :unapproved, -> { where(approved: false) }
  scope :in_last_week, -> { where('created_at >= ?', 1.week.ago) }

  scope :qualified_tutors_for, ->(search) {
    search_center = search[:zip]
    search_radius = search[:radious] || 10

    tutors = self.tutors
      .approved_with_bank_info
      .with_avatar
      .with_hourly_rate
    tutors = tutors.with_area(search_center, search_radius) if search_center.present?

    if search[:hourly_rate_low].present? || search[:hourly_rate_high].present?
      tutors = tutors.with_price(search[:hourly_rate_low].to_i, search[:hourly_rate_high].to_i)
    end

    tutors = tutors.with_subject(search[:subject]) if search[:subject].present?

    tutors.order(:up_rating_count, :lesson_count, :reference_count)
  }

  def image_url
    avatar.url(:thumb)
  end

  def hiring_request(tutor)
    hiring_requests.where('tutor_id = ?', tutor.id).first
  end

  def name
    "#{first_name} #{last_name}"
  end

  def has_stripe_account
    stripe_account_id.present?
  end

  def reference_count
    references.count
  end

  def accepting_new_student
    accepting_new_students? ? 'Yes' : 'No'
  end

  def as_json(opts = {})
    super(
      {
        include: {
          subjects: {
            only: %i[id type],
            methods: %i[subject subject_grade_level]
          }
        },
        methods: %i[
          name
          hourly_rate_cents
        ],
      }.merge(opts)
    ).deep_transform_keys! { |k| k.camelize(:lower) }
  end

  def mini_profile_json
    as_json(
      methods: %i[
        name
        hourly_rate_cents
        image_url
        accepting_new_student
      ],
      only: %i[
        id
        email
        brand
        last4
        availability
      ]
    )
  end

  def profile_json(_opts = {})
    as_json(
      include: {
        subjects: {
          only: [:id],
          methods: %i[subject subject_grade_level]
        },
        confirmed_references: {
          only: %i[
            id
            created_at
            title
            rating
          ],
          methods: %i[
            reference_text
          ]
        },
        educations: {
          only: [:id],
          methods: %i[degree course institute]
        }
      },
      methods: %i[
        name
        hourly_rate_cents
        reference_count
        has_stripe_account
        live
        image_url
        accepting_new_student
      ],
      only: %i[
        id
        email
        phone
        zip
        first_name
        last_name
        bio
        desc_tutoring_style
        years_exp
        why_tutor
        accepting_new_students
        undergrad_degree
        undergrad_school
        resume
        type
        stripe_token_id
        subject
        subject_qualifications
        gender
        travel_distance
        phone_number
        street_address
        city
        state
        student_name
        brand
        last4
        latitude
        longitude
        availability
        hourly_rate_cents
      ]
    )
  end

  def active_for_authentication?
    super && live?
  end

  def live?
    approved?
  end

  def live
    live?
  end

  # can later be conditionalized on 'live' vs 'approved', 'disabled', etc
  def inactive_message
    # this method actually is not implemented by devise_token_auth
    # instead, use devise_token_auth locales file or override #render_create_error_not_confirmed in controller
    # still not sure why it uses not_confirmed anyway, but at least I'm not the only one. See below
    #
    # This incomplete PR corrects it:
    # https://github.com/lynndylanhurley/devise_token_auth/pull/533
    # https://github.com/lynndylanhurley/devise_token_auth/pull/533/files
  end

  def is_admin?
    type == TYPE_ADMIN
  end

  def teacher?
    type == TYPE_TEACHER
  end

  def learner?
    type == TYPE_LEARNER
  end

  def approve!
    if teacher?
      update_attributes!(
        approved: true,
        accepting_new_students: true,
      )
    else
      update_attributes!(approved: true)
    end

    send_approval_email! if teacher? && sign_in_count < 1
    send_parent_approval_email! if learner? && sign_in_count < 1
  end

  def disable!
    update_attributes!(approved: false)
  end

  def send_parent_approval_email!
    SendParentApprovalEmailJob.perform_later(id)
    # UserMailer.welcome_parent_email(id).deliver_now
  end

  private

  def set_default_type
    self.type ||= TYPE_TEACHER
  end

  def set_default_password
    self.password ||= Devise.friendly_token.first(8)
  end

  def set_approved_for_user
    # default to false for all user types for now
    # - learner approved when matched in GuidedSearch
    # - teacher approved when teacherApplication is approved
    self.approved ||= false
  end

  def send_approval_email!
    SendApprovalEmailJob.perform_later(id)
  end

  def send_email_to_reference
    references.each do |ref|
      SendReferenceEmailJob.perform_later(ref.id)
    end
  end

  def send_email
    RegistrationEmailJob.perform_later(id) if is_a? Teacher
  end

  def approve_teacher_profile_if_references
    # return if type != TYPE_TEACHER || references.blank?

    # approve! if subjects.present? && references.count >=3
  end

  def set_uuid
    self.uuid = SecureRandom.uuid
  end
end
