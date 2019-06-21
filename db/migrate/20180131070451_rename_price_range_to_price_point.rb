class RenamePriceRangeToPricePoint < ActiveRecord::Migration[5.1]
  def change
    rename_column :postings, :price_range, :price_point
  end
end
