class ScreeningSerializer
  include JSONAPI::Serializer
  attributes :user1, :user2, :user3, :created_at
  # belongs_to :user1, serializer: UserSerializer
  # belongs_to :user2, serializer: UserSerializer, optional: true
  # belongs_to :user3, serializer: UserSerializer, optional: true
  # has_many :screening_movies
  # has_many :movies, through: :screening_movies
  # has_many :screening_genres
  # has_many :genres, through: :screening_genres
end
