class CreateMovieCrews < ActiveRecord::Migration[6.1]
  def change
    create_table :movie_crews do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :crew, null: false, foreign_key: true
      t.string :job

      t.timestamps
    end
  end
end
