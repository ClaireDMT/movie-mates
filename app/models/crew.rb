class Crew < ApplicationRecord
  has_many :movie_crews, dependent: :destroy
  has_many :movies, through: :movie_crews
  validates :tmdb_id, uniqueness: true
  validates :name, uniqueness: true
end
