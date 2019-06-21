class AddColumnToSearchRequest < ActiveRecord::Migration[5.1]
  def change
    add_column :search_requests, :price_range, :string
    add_column :search_requests, :tutoring_type, :string
    add_column :search_requests, :motivated, :boolean
    add_column :search_requests, :shy, :boolean
    add_column :search_requests, :outgoing, :boolean
    add_column :search_requests, :focuses_trouble, :boolean
    add_column :search_requests, :focuses_well, :boolean
    rename_column :search_requests, :location, :zip
  end
end
