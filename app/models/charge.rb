class Charge < ApplicationRecord
  belongs_to :lesson

  # has_paper_trail

  enum txn_type: %i[credit debit refund]
  enum status: %i[success failed]
end
