class AddColumnToUser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :tag_line, :text
  	add_column :users, :subject, :string
  	add_column :users, :reference_personal_note, :text
  	add_column :users, :travel, :boolean
  	add_column :users, :phone_number, :string

  	add_column :references, :first_name, :string
  	add_column :references, :last_name, :string
  end
end
