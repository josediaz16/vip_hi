class AddPhotoPositionToCelebrity < ActiveRecord::Migration[5.2]
  def change
    add_column :celebrities, :photo_position, :string, null: false, default: ""
  end
end
