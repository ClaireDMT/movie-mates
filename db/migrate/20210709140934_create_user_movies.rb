class CreateUserMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :user_movies do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :watched
      t.boolean :toWatch
      t.integer :rating

      t.timestamps
    end
  end
end
