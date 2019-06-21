class AddHourlyRateToHiringRequest < ActiveRecord::Migration[5.1]
  def change
  	add_column :hiring_requests, :tutor_hourly_rate_cents, :integer
  end
end
