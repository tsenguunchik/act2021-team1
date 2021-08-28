# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user_a = User.find_by(email: 'test1@gmail.com')
user_a = User.create(email: 'test1@gmail.com', first_name: 'Tsenguun', last_name: "Tsogbadrakh", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "University of Washington", gmail_link: "tsenguun@amsa.mn") if user_a.nil?

user_b = User.find_by(email: 'test2@gmail.com')
user_b = User.create(email: 'test2@gmail.com', first_name: 'Jamsrandorj', last_name: "Batbayar", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "Mahirishi Internation University", gmail_link: "jamsrandorj1@gmail.com") if user_b.nil?

user_c = User.find_by(email: 'test3@gmail.com')
user_c = User.create(email: 'test3@gmail.com', first_name: 'Khasan', last_name: "Bold", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "Mahirishi Internation University", gmail_link: "khasan.bold@gmail.com") if user_c.nil?
