class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, index: { unique: true }, null: false, limit: 100
      t.string :password_digest
      t.string :twitter_link
      t.string :facebook_link
      t.string :instagram_link
      t.string :confirmation_code, limit: 6
      t.boolean :confirmation_status, default: false
      t.datetime :confirmation_sent_at
      t.datetime :password_reset_sent_at

      t.timestamps
      t.datetime :deleted_at
    end
  end
end
