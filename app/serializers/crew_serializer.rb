class CrewSerializer
  include JSONAPI::Serializer
  attributes :name, :biography, :known_for, :age
  has_many :movie_crews
  has_many :movies, through: :movie_crews
end
