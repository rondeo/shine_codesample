class AddSubjectColumnToHiringRequest < ActiveRecord::Migration[5.1]
  def change
    add_column :hiring_requests, :subject, :string
  end
end
