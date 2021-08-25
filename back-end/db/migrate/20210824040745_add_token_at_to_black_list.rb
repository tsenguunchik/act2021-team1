class AddTokenAtToBlackList < ActiveRecord::Migration[6.1]
  def change
    add_column :jwt_blacklists, :token_at, :string, limit: 15, after: :exp
    add_index :jwt_blacklists, :token_at
  end
end
