class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :en_title, index: true
      t.string :title, index: true
      t.string :language
      t.integer :year, index: true
      t.float :imdb_rating, index: true
      t.text :overview
      t.string :imdb_id
      t.integer :tmdb_id, index: true
      t.string :poster_url

      t.timestamps
    end
  end
end
