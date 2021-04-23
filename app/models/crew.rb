class Crew < ApplicationRecord
  has_many :movie_crews, dependent: :destroy
  has_many :movies, through: :movie_crews
end
