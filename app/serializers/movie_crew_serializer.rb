class MovieCrewSerializer
  include JSONAPI::Serializer
  attributes :movie_id, :crew_id, :job
  belongs_to :movie
  belongs_to :crew
end
