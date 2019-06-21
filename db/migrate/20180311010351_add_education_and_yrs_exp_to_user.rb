class AddEducationAndYrsExpToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :undergrad_degree, :string
    add_column :users, :undergrad_school, :string
    add_column :users, :grad_degree, :string
    add_column :users, :grad_school, :string
    add_column :users, :years_exp, :integer
  end
end
