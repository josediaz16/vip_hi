class CreateCountries < ActiveRecord::Migration[5.2]
  def change
    create_table :countries do |t|
      t.string :name, null: false, default: ""
      t.string :code_iso, null: false, default: ""
      t.string :currency, null: false, default: ""
      t.string :country_code, null: false, default: ""
      t.string :international_prefix, null: false, default: ""
      t.string :region, null: false, default: ""

      t.timestamps null: false
    end

    add_index :countries, :code_iso,  unique: true
    add_index :countries, :name,      unique: true
  end
end
