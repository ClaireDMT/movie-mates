class ScreeningMovieSerializer
  include JSONAPI::Serializer
  attributes :movie, :screening
  belongs_to :movie
end
