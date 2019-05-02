class AddKnownAsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :known_as, :string, null: false, default: ""
  end
end
