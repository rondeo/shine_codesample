class AddRatingToLesson < ActiveRecord::Migration[5.1]
  def change
    add_column :lessons, :rating, :string
  end
end
