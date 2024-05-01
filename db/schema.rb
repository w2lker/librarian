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

ActiveRecord::Schema[7.1].define(version: 2024_05_01_203350) do
  create_table "books", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.string "ISBN"
    t.string "publisher"
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "skills", default: "{}"
    t.string "coverURL"
  end

  create_table "topics", force: :cascade do |t|
    t.string "tag"
    t.text "description"
    t.integer "book_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id", "tag"], name: "index_topics_on_book_id_and_tag"
    t.index ["book_id"], name: "index_topics_on_book_id"
  end

  add_foreign_key "topics", "books"
end
