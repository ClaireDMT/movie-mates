class AddUserToScreeningMovies < ActiveRecord::Migration[6.1]
  def change
    add_reference :screening_movies, :user, null: true, foreign_key: true
  end
end
