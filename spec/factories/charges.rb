FactoryBot.define do
  factory :charge do
    txn_type Charge.txn_types[:credit]
    status Charge.statuses[:success]
    hours 5
    price_per_hour 100
    amount 5000
  end
end
