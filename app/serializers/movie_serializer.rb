class MovieSerializer
  include JSONAPI::Serializer
  attributes :en_title, :title, :language, :year, :imdb_rating, :overview, :poster_url
  has_many :movie_crews
  has_many :crews, through: :movie_crews
end
