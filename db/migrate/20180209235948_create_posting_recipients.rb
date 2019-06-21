class CreatePostingRecipients < ActiveRecord::Migration[5.1]
  def change
    create_table :posting_recipients do |t|
      t.references :posting, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
