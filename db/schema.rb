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

ActiveRecord::Schema.define(version: 2021_09_14_140924) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "crews", force: :cascade do |t|
    t.string "name"
    t.text "biography"
    t.string "known_for"
    t.integer "age"
    t.integer "tmdb_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_crews_on_name"
    t.index ["tmdb_id"], name: "index_crews_on_tmdb_id"
  end

  create_table "friendships", id: :serial, force: :cascade do |t|
    t.string "friendable_type"
    t.integer "friendable_id"
    t.integer "friend_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "blocker_id"
    t.integer "status"
    t.index ["friendable_id", "friend_id"], name: "index_friendships_on_friendable_id_and_friend_id", unique: true
  end

  create_table "genres", force: :cascade do |t|
    t.string "name"
    t.integer "tmdb_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "icon"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "moods", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "movie_crews", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "crew_id", null: false
    t.string "job"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crew_id"], name: "index_movie_crews_on_crew_id"
    t.index ["movie_id"], name: "index_movie_crews_on_movie_id"
  end

  create_table "movie_genres", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "genre_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["genre_id"], name: "index_movie_genres_on_genre_id"
    t.index ["movie_id"], name: "index_movie_genres_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "en_title"
    t.string "title"
    t.string "language"
    t.integer "year"
    t.float "imdb_rating"
    t.text "overview"
    t.string "imdb_id"
    t.integer "tmdb_id"
    t.string "poster_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["en_title"], name: "index_movies_on_en_title"
    t.index ["imdb_rating"], name: "index_movies_on_imdb_rating"
    t.index ["title"], name: "index_movies_on_title"
    t.index ["tmdb_id"], name: "index_movies_on_tmdb_id"
    t.index ["year"], name: "index_movies_on_year"
  end

  create_table "screening_genres", force: :cascade do |t|
    t.bigint "genre_id", null: false
    t.bigint "screening_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["genre_id"], name: "index_screening_genres_on_genre_id"
    t.index ["screening_id"], name: "index_screening_genres_on_screening_id"
  end

  create_table "screening_movies", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "screening_id", null: false
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["movie_id"], name: "index_screening_movies_on_movie_id"
    t.index ["screening_id"], name: "index_screening_movies_on_screening_id"
    t.index ["user_id"], name: "index_screening_movies_on_user_id"
  end

  create_table "screenings", force: :cascade do |t|
    t.bigint "user1_id", null: false
    t.bigint "user2_id"
    t.bigint "user3_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "movie_id"
    t.index ["movie_id"], name: "index_screenings_on_movie_id"
    t.index ["user1_id"], name: "index_screenings_on_user1_id"
    t.index ["user2_id"], name: "index_screenings_on_user2_id"
    t.index ["user3_id"], name: "index_screenings_on_user3_id"
  end

  create_table "user_movies", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "user_id", null: false
    t.boolean "watched"
    t.boolean "toWatch"
    t.integer "rating"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["movie_id"], name: "index_user_movies_on_movie_id"
    t.index ["user_id"], name: "index_user_movies_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin", default: false, null: false
    t.boolean "boolean", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "picture"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "movie_crews", "crews"
  add_foreign_key "movie_crews", "movies"
  add_foreign_key "movie_genres", "genres"
  add_foreign_key "movie_genres", "movies"
  add_foreign_key "screening_genres", "genres"
  add_foreign_key "screening_genres", "screenings"
  add_foreign_key "screening_movies", "movies"
  add_foreign_key "screening_movies", "screenings"
  add_foreign_key "screening_movies", "users"
  add_foreign_key "screenings", "movies"
  add_foreign_key "screenings", "users", column: "user1_id"
  add_foreign_key "screenings", "users", column: "user2_id"
  add_foreign_key "screenings", "users", column: "user3_id"
  add_foreign_key "user_movies", "movies"
  add_foreign_key "user_movies", "users"
end
