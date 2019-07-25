class AddsHandleToCelebrities < ActiveRecord::Migration[5.2]
  def change
    add_column :celebrities, :handle, :string, null: false, default: ""
  end
end
