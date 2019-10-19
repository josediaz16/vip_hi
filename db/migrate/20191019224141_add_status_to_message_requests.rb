class AddStatusToMessageRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :message_requests, :status, :string, null: false, default: 'pending'
  end
end
