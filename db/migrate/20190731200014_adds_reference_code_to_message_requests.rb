class AddsReferenceCodeToMessageRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :message_requests, :reference_code, :string, null: false, default: ""
  end
end
