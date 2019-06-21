class CreateSubjects < ActiveRecord::Migration[5.1]
  def change
    create_table :subjects do |t|
      t.string :name, null: false
      t.string :grade_level, null: false
      t.references :user, foreign_key: true
    end
  end
end
