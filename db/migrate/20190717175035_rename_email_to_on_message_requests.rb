class RenameEmailToOnMessageRequests < ActiveRecord::Migration[5.2]
  def change
    rename_column :message_requests, :email_to, :phone_to
  end
end
