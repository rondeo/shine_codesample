class CreateHiringRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :hiring_requests do |t|
      t.integer :tutor_id, index: true, null: false
      t.integer :learner_id, index: true, null: false
      t.boolean :status
      t.timestamps
    end
  end
end
