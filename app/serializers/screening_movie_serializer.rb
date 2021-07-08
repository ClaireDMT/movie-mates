class ScreeningMovieSerializer
  include JSONAPI::Serializer
  attributes :movie, :screening
  belongs_to :movie
  # belongs_to :user3, class_name: "User", optional: true
  # has_many :screening_movies
  # has_many :movies, through: :screening_movies
  # has_many :screening_genres
  # has_many :genres, through: :screening_genres
end
