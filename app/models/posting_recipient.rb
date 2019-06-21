class PostingRecipient < ApplicationRecord
  belongs_to :posting
  belongs_to :user
end
