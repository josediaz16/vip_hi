class CreateCelebrities < ActiveRecord::Migration[5.2]
  def change
    create_table :celebrities do |t|
      t.text :biography, null: false, default: ""
      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
