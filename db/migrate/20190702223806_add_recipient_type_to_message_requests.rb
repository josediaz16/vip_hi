class AddRecipientTypeToMessageRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :message_requests, :recipient_type, :string, null: false, default: ""
  end
end
