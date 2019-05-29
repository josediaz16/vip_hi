class CreateMessageRequest < ActiveRecord::Migration[5.2]
  def change
    create_table :message_requests do |t|
      t.text :brief, null: false, default: ""
      t.string :to, null: false, default: ""
      t.string :from, null: false, default: ""
      t.string :email_to, null: false, default: ""
      t.references :celebrity, index: true, foreign_key: true
    end
  end
end
