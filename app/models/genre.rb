class Genre < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  has_many :movie_genres
  has_many :movies, through: :movie_genres
end
