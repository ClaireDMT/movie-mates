class AddMovieToScreening < ActiveRecord::Migration[6.1]
  def change
    add_reference :screenings, :movie, null: true, foreign_key: true
  end
end
