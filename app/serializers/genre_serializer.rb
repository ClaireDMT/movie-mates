class GenreSerializer
  include JSONAPI::Serializer
  attributes :name, :tmdb_id
end
