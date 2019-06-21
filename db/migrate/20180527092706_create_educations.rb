class CreateEducations < ActiveRecord::Migration[5.1]
  def change
    create_table :educations do |t|
      t.references :user, foreign_key: true
      t.string :degree
      t.string :course
      t.string :institute
      t.timestamps
    end
  end
end
