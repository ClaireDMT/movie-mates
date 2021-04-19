class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :en_title
      t.string :title
      t.string :language
      t.integer :year
      t.float :imdb_rating
      t.float :rotten_rating
      t.text :overview
      t.string :imdb_id
      t.integer :tmdb_id
      t.string :poster_url

      t.timestamps
    end
  end
end
