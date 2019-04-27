class RenameUserColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column   :users, :first_name
    remove_column   :users, :last_name
    add_column      :users, :name, :string, null: false, default: ""

    add_reference   :users, :country, foreign_key: true, null: false
  end
end
