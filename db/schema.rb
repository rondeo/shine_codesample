# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190511212950) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "charges", force: :cascade do |t|
    t.bigint "lesson_id", null: false
    t.integer "txn_type", null: false
    t.integer "status", null: false
    t.string "stripe_reference"
    t.decimal "hours", null: false
    t.integer "price_per_hour", null: false
    t.decimal "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "failure_code"
    t.string "failure_message"
    t.decimal "payout_amount"
    t.decimal "payout_percentage"
    t.index ["lesson_id"], name: "index_charges_on_lesson_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer "sender_id"
    t.integer "recipient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "hiring_request_id"
    t.index ["hiring_request_id"], name: "index_conversations_on_hiring_request_id"
    t.index ["recipient_id", "sender_id"], name: "index_conversations_on_recipient_id_and_sender_id", unique: true
    t.index ["sender_id", "recipient_id"], name: "index_conversations_on_sender_id_and_recipient_id", unique: true
  end

  create_table "educations", force: :cascade do |t|
    t.bigint "user_id"
    t.string "degree"
    t.string "course"
    t.string "institute"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_educations_on_user_id"
  end

  create_table "hiring_requests", force: :cascade do |t|
    t.integer "tutor_id", null: false
    t.integer "learner_id", null: false
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "tutor_hourly_rate_cents"
    t.string "subject"
    t.index ["learner_id"], name: "index_hiring_requests_on_learner_id"
    t.index ["tutor_id"], name: "index_hiring_requests_on_tutor_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.integer "tutor_id", null: false
    t.integer "learner_id", null: false
    t.integer "hours", null: false
    t.date "lesson_date"
    t.text "summary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "payment_status"
    t.integer "retry_count", default: 0
    t.integer "retry_set", default: 1
    t.integer "minutes"
    t.string "subject"
    t.integer "status", default: 0
    t.string "rating"
    t.string "private_feedback"
    t.index ["learner_id"], name: "index_lessons_on_learner_id"
    t.index ["tutor_id"], name: "index_lessons_on_tutor_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "conversation_id"
    t.integer "user_id"
    t.boolean "read", default: false
  end

  create_table "posting_recipients", force: :cascade do |t|
    t.bigint "posting_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["posting_id"], name: "index_posting_recipients_on_posting_id"
    t.index ["user_id"], name: "index_posting_recipients_on_user_id"
  end

  create_table "postings", force: :cascade do |t|
    t.string "area"
    t.string "subject"
    t.string "subject_grade_level"
    t.string "price_point"
    t.string "start_date"
    t.string "about_student"
    t.boolean "tutor_compassionate"
    t.boolean "tutor_creative"
    t.boolean "tutor_structured"
    t.boolean "tutor_analytical"
    t.string "parent_name"
    t.string "student_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tutor_note"
  end

  create_table "references", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "email"
    t.string "personal_note"
    t.string "location"
    t.string "reference_text"
    t.boolean "confirmed", default: false
    t.datetime "confirmed_at"
    t.integer "reminder_count", default: 0
    t.datetime "last_reminder_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "referenced_by"
    t.float "rating"
    t.string "title"
    t.string "first_name"
    t.string "last_name"
    t.string "reference_title"
    t.string "uuid"
    t.index ["user_id"], name: "index_references_on_user_id"
  end

  create_table "search_requests", force: :cascade do |t|
    t.string "user_type"
    t.string "grade"
    t.string "school"
    t.string "city"
    t.string "subject"
    t.text "availability", default: [], array: true
    t.string "name"
    t.string "student_name"
    t.string "email"
    t.string "phone"
    t.string "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "price_range"
    t.string "tutoring_type"
    t.boolean "motivated"
    t.boolean "shy"
    t.boolean "outgoing"
    t.boolean "focuses_trouble"
    t.boolean "focuses_well"
    t.integer "user_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "name", null: false
    t.string "grade_level", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_subjects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "nickname"
    t.string "image"
    t.json "tokens"
    t.string "zip"
    t.string "bio"
    t.string "desc_tutoring_style"
    t.string "references_str"
    t.integer "hourly_rate_cents"
    t.boolean "approved", default: false
    t.string "first_name"
    t.string "last_name"
    t.string "resume"
    t.string "undergrad_degree"
    t.string "undergrad_school"
    t.string "grad_degree"
    t.string "grad_school"
    t.integer "years_exp"
    t.string "why_tutor"
    t.float "latitude"
    t.float "longitude"
    t.string "stripe_token_id"
    t.string "stripe_account_id"
    t.string "strpe_authorization_code"
    t.string "express_state"
    t.string "stripe_customer_id"
    t.boolean "allow_password_change", default: false, null: false
    t.boolean "accepting_new_students"
    t.boolean "disabled"
    t.string "tagline"
    t.text "tag_line"
    t.string "subject"
    t.text "reference_personal_note"
    t.boolean "travel"
    t.string "phone_number"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "student_name"
    t.string "uuid"
    t.boolean "accept_tos"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.bigint "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string "gender"
    t.integer "travel_distance"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "brand"
    t.string "last4"
    t.text "availability", default: [], array: true
    t.integer "lesson_count"
    t.integer "reference_count"
    t.integer "up_rating_count"
    t.string "subject_qualifications"
    t.index ["accepting_new_students"], name: "index_users_on_accepting_new_students"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["disabled"], name: "index_users_on_disabled"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "conversations", "hiring_requests"
  add_foreign_key "educations", "users"
  add_foreign_key "posting_recipients", "postings"
  add_foreign_key "posting_recipients", "users"
  add_foreign_key "references", "users"
  add_foreign_key "subjects", "users"
end
