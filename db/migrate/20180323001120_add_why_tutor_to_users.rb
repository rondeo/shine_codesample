class AddWhyTutorToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :why_tutor, :string
  end
end
