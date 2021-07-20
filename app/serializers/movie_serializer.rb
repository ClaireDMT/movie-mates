class MovieSerializer
  include JSONAPI::Serializer
  attributes :en_title, :title, :language, :year, :imdb_rating, :overview, :poster_url
  # has_many :genres, through: :movie_genres
  has_many :crews, through: :movie_crews, if: proc { |_, params| params[:include_crews] == true }

  attributes :genres do |obj|
    GenreSerializer.new(obj.genres)
  end
end
