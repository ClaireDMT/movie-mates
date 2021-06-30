class Genre < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  has_many :movie_genres, dependent: :destroy
  has_many :movies, through: :movie_genres
  has_many :screening_genres
  has_many :screenings, through: :screening_genres
end
