class AddFanToMessageRequests < ActiveRecord::Migration[5.2]
  def change
    add_reference :message_requests, :fan, null: false, foreign_key: true
  end
end
