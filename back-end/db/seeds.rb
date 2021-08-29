# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user_a = User.find_by(email: 'tsenguun@amsa.mn')
user_a = User.create(email: 'tsenguun@amsa.mn', first_name: 'Tsenguun', last_name: "Tsogbadrakh", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "University of Michigan", facebook_link: "https://www.facebook.com/tsenguun.tsogbadrakh", linkedin_link: "https://www.linkedin.com/in/tsenguun-ts/", gmail_link: "tsenguun@amsa.mn") if user_a.nil?

user_b = User.find_by(email: 'jamsrandorj1@gmail.com')
user_b = User.create(email: 'jamsrandorj1@gmail.com', first_name: 'Jamsrandorj', last_name: "Batbayar", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "Maharishi International University", facebook_link: "https://www.facebook.com/jamsrandorjb", linkedin_link: "https://www.linkedin.com/in/jamsrandorjb/", gmail_link: "jamsrandorj1@gmail.com") if user_b.nil?

user_c = User.find_by(email: 'khasan.bold@gmail.com')
user_c = User.create(email: 'khasan.bold@gmail.com', first_name: 'Khasan', last_name: "Bold", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "Maharishi International University", facebook_link: "https://www.facebook.com/XaCaHaa", linkedin_link: "https://www.linkedin.com/in/khasanbold/", gmail_link: "khasan.bold@gmail.com") if user_c.nil?

user_d = User.find_by(email: 'eenkhjin93@gmail.com')
user_d = User.create(email: 'eenkhjin93@gmail.com', first_name: 'Enkhjin', last_name: "Enkhjargal", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "University of California, Irvine", linkedin_link: "https://www.linkedin.com/in/enkhjin-enji-enkhjargal-b503b0149/", gmail_link: "eenkhjin93@gmail.com") if user_d.nil?

user_e = User.find_by(email: 'sukhbat@amsa.mn')
user_e = User.create(email: 'sukhbat@amsa.mn', first_name: 'Sukhbat', last_name: "Lkhagvadorj", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "Wesleyan University", facebook_link: "https://www.facebook.com/sukhbat.seed", linkedin_link: "https://www.linkedin.com/in/sukhbatl/", gmail_link: "sukhbat@amsa.mn") if user_e.nil?

user_f = User.find_by(email: 'enerelt1115@gmail.com')
user_f = User.create(email: 'enerelt1115@gmail.com', first_name: 'Enerelt', last_name: "Bat-Erdene", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "University of Whitworth", linkedin_link: "https://www.linkedin.com/in/enerelt-bat-erdene/", gmail_link: "enerelt1115@gmail.com") if user_f.nil?

user_g = User.find_by(email: 'angietserenjav@gmail.com')
user_g = User.create(email: 'angietserenjav@gmail.com', first_name: 'Angie', last_name: "Tserenjav", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "University of Washington Bothell", linkedin_link: "https://www.linkedin.com/in/angie-tserenjav/", gmail_link: "angietserenjav@gmail.com") if user_g.nil?

user_h = User.find_by(email: 'ganzorigbattur@gmail.com')
user_h = User.create(email: 'ganzorigbattur@gmail.com', first_name: 'Ganzorig', last_name: "Battur", password: '12345678', confirmation_status: 1, user_type: 1, university_name: "University of Minnesota - Twin Cities", facebook_link: "https://www.facebook.com/ganzorig.battur.3", linkedin_link: "https://www.linkedin.com/in/ganzoo/", gmail_link: "ganzorigbattur@gmail.com") if user_h.nil?
