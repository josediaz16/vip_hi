class AddPriceToCelebrities < ActiveRecord::Migration[5.2]
  def change
    add_column :celebrities, :price, :decimal, precision: 10, scale: 2, default: 0.0, null: false
  end
end
