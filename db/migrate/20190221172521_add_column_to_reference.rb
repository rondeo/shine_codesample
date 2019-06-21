class AddColumnToReference < ActiveRecord::Migration[5.1]
  def change
    add_column :references, :reference_title, :string
  end
end
