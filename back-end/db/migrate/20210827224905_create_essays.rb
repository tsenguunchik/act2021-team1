class CreateEssays < ActiveRecord::Migration[6.1]
  def change
    create_table :essays do |t|
      t.string :personal_note
      t.integer :essay_rule
      t.references :user
      t.bigint :mentor_id, null: true, references: %i[users id]
      t.string :university_name
      t.string :google_doc_link
      t.text :essay_intro
      t.bigint :seen_count, default: 0

      t.timestamps
    end
  end
end
