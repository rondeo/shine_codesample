class Subject < ApplicationRecord
  belongs_to :user

  # methods for re
  def subject
    name
  end

  def subject_grade_level
    grade_level
  end

  def as_json(opts = {})
    super(
      {
        include: [
        ],
        methods: %i[
          subject
          subject_grade_level
        ]
      }.merge(opts)
    ).deep_transform_keys! { |k| k.camelize(:lower) }
  end
end
