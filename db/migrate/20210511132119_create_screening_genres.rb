class CreateScreeningGenres < ActiveRecord::Migration[6.1]
  def change
    create_table :screening_genres do |t|
      t.references :genre, null: false, foreign_key: true
      t.references :screening, null: false, foreign_key: true

      t.timestamps
    end
  end
end
