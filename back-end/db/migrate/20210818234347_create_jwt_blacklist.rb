class CreateJwtBlacklist < ActiveRecord::Migration[6.1]
  def change
    create_table :jwt_blacklists do |t|
      t.bigint :user_id, null: false, references: %i[users id]
      t.string :jwt, limit: 300, null: false
      t.boolean :is_social, default: false
      t.integer :exp
      t.timestamps
    end
  end
end
