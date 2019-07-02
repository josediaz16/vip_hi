class MakeFanOptionalInMr < ActiveRecord::Migration[5.2]
  def change
    change_column :message_requests, :fan_id, :bigint, null: true
  end
end
