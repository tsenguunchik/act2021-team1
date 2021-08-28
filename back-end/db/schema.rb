# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_28_044913) do

  create_table "essay_logs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "essay_id"
    t.bigint "user_id"
    t.integer "essay_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["essay_id"], name: "index_essay_logs_on_essay_id"
    t.index ["user_id"], name: "index_essay_logs_on_user_id"
  end

  create_table "essays", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "personal_note"
    t.integer "essay_rule"
    t.bigint "user_id"
    t.bigint "mentor_id"
    t.string "university_name"
    t.string "google_doc_link"
    t.text "essay_intro"
    t.bigint "seen_count", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_essays_on_user_id"
  end

  create_table "jwt_blacklists", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "jwt", limit: 300, null: false
    t.boolean "is_social", default: false
    t.integer "exp"
    t.string "token_at", limit: 15
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["token_at"], name: "index_jwt_blacklists_on_token_at"
  end

  create_table "notifications", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.string "information"
    t.integer "notif_type"
    t.integer "target_id"
    t.integer "user_id"
    t.boolean "seen", default: false
    t.integer "essay_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", limit: 100, null: false
    t.string "password_digest"
    t.string "twitter_link"
    t.string "facebook_link"
    t.string "instagram_link"
    t.string "confirmation_code", limit: 6
    t.boolean "confirmation_status", default: false
    t.datetime "confirmation_sent_at"
    t.datetime "password_reset_sent_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "user_type", default: 0
    t.string "university_name"
    t.string "gmail_link"
    t.string "linkedin_link"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
