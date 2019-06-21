class CreateSearchRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :search_requests do |t|
      t.string :user_type
      t.string :grade
      t.string :school
      t.string :city
      t.string :subject
      t.text :availability, array: true, default: []
      t.string :name
      t.string :student_name
      t.string :email
      t.string :phone
      t.string :location
      t.timestamps
    end
  end
end
