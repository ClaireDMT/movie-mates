class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :en_title
      t.string :title
      t.string :language
      t.integer :year
      t.string :imdb_rating
      t.text :overview
      t.string :imdb_id
      t.string :poster_url
      t.references :crew, null: false, foreign_key: true

      t.timestamps
    end
  end
end
