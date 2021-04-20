class Movie < ApplicationRecord
  validates :tmdb_id, uniqueness: true
  has_many :movie_crews
  has_many :crews, through: :movie_crews
  has_many :movie_genres
  has_many :genres, through: :movie_genres
end
