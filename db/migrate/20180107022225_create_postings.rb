class CreatePostings < ActiveRecord::Migration[5.1]
  def change
    create_table :postings do |t|
      t.string :area
      t.string :subject
      t.string :subject_grade_level
      t.string :price_range
      t.string :start_date
      t.string :about_student
      t.boolean :tutor_compassionate
      t.boolean :tutor_creative
      t.boolean :tutor_structured
      t.boolean :tutor_analytical
      t.string :parent_name
      t.string :student_name
      t.string :email

      t.timestamps
    end
  end
end
