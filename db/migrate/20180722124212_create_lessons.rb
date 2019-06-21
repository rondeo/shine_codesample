class CreateLessons < ActiveRecord::Migration[5.1]
  def change
    create_table :lessons do |t|
      t.integer :tutor_id, index: true, null: false
      t.integer :learner_id, index: true, null: false
      t.integer :hours, null: false
      t.date :lesson_date
      t.text :summary
      t.timestamps	
    end
  end
end
