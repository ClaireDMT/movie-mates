class CreateScreeningMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :screening_movies do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :screening, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
