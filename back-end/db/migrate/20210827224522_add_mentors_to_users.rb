class AddMentorsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :user_type, :integer, default: 0
    add_column :users, :university_name, :string
    add_column :users, :gmail_link, :string
    add_column :users, :linkedin_link, :string
  end
end
