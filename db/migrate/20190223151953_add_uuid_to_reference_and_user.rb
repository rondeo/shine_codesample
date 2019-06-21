class AddUuidToReferenceAndUser < ActiveRecord::Migration[5.1]
  def change
    add_column :references, :uuid, :string
    add_column :users, :uuid, :string
  end
end
