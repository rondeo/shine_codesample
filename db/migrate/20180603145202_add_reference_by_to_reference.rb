class AddReferenceByToReference < ActiveRecord::Migration[5.1]
  def change
  	add_column :references, :referenced_by, :integer
  end
end
