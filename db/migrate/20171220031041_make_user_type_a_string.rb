class MakeUserTypeAString < ActiveRecord::Migration[5.1]
  def up
    change_column :users, :type, :string
  end

  def down
    # used to be an int, but keep it the same for code consistency's sake
    change_column :users, :type, :string
  end
end
