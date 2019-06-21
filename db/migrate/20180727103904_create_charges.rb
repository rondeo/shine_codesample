class CreateCharges < ActiveRecord::Migration[5.1]
  def change
    create_table :charges do |t|
      t.references :lesson, index: true, null: false
      t.integer :txn_type, null: false
      t.integer :status, null: false
      t.string :stripe_reference
      t.decimal :hours, null: false
      t.integer :price_per_hour, null: false
      t.decimal :amount, null: false
      t.timestamps
    end
  end
end
