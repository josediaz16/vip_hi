class AddOriginToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :origin, :string, null: false, default: ""
  end
end
