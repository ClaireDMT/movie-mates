class Screening < ApplicationRecord
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User"
  belongs_to :user3, class_name: "User", optional: true
  has_many :screening_movies
  has_many :movies, through: :screening_movies
  has_many :screening_genres
  has_many :genres, through: :screening_genres
end
