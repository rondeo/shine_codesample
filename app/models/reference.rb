class Reference < ApplicationRecord
  MAX_REMINDER = 3

  belongs_to :user,
    optional: true,
    # have Rails keep an up-to-date count of the associated relation: https://guides.rubyonrails.org/association_basics.html#options-for-belongs-to-counter-cache
    counter_cache: :reference_count

  belongs_to :reporter,
    class_name: 'User',
    foreign_key: :referenced_by,
    optional: true,
    inverse_of: :given_references

  # the tutor who gets the reference
  alias_attribute :tutor, :user
  # the parent giving the reference
  alias_attribute :parent, :reporter
  validates :referenced_by, uniqueness: { scope: :user_id }, allow_nil: true

  # delegate :name, to: :reporter, prefix: true, allow_nil: true
  # delegate :email, to: :reporter, prefix: true, allow_nil: true

  before_create :set_uuid

  scope :unconfirmed, ->() {
    where(confirmed: false)
  }
  scope :confirmed, ->() {
    where(confirmed: true)
  }
  scope :remindable, ->() {
    where(
      'reminder_count <= ? AND (last_reminder_at IS NULL OR last_reminder_at <= ?)',
      Reference::MAX_REMINDER, 1.week.ago
    )
  }

  def full_name
    [title, first_name, last_name].compact.join(' ')
  end

  def title_name
    [title, last_name].compact.join(' ')
  end

  private

  def set_uuid
    self.uuid = SecureRandom.uuid
  end
end
