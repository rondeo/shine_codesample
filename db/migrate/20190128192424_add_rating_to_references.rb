class AddRatingToReferences < ActiveRecord::Migration[5.1]
  def change
    add_column :references, :rating, :float
  end
end
