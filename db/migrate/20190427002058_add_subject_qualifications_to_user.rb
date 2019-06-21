class AddSubjectQualificationsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :subject_qualifications, :string
  end
end
