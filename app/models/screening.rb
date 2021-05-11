class Screening < ApplicationRecord
  belongs_to :user1
  belongs_to :user2
  belongs_to :user3
  has_many :screening_movies
  has_may :movies, through: :screening_movies
  has_many :screening_genres
  has_may :genres, through: :screening_genres
end
