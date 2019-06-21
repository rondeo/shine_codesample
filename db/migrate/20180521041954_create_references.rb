class CreateReferences < ActiveRecord::Migration[5.1]
  def change
    create_table :references do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :email
      t.string :personal_note
      t.string :location
      t.string :reference_text
      t.boolean :confirmed, default: false
      t.datetime :confirmed_at
      t.integer :reminder_count, default: 0
      t.datetime :last_reminder_at
      t.timestamps
    end
  end
end
