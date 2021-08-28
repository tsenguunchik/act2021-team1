class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :information
      t.integer :notif_type
      t.integer :target_id
      t.integer :user_id
      t.boolean :seen, default: false
      t.integer :essay_id

      t.timestamps
    end
  end
end
