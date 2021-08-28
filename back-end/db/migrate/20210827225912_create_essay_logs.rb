class CreateEssayLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :essay_logs do |t|
      t.references :essay
      t.references :user
      t.integer :essay_status

      t.timestamps
    end
  end
end
