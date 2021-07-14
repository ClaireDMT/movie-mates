class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :first_name, :last_name, :email, :picture
  has_many :screenings_as_user1, serializer: ScreeningSerializer
  has_many :screenings_as_user2, serializer: ScreeningSerializer
  has_many :screenings_as_user3, serializer: ScreeningSerializer
  # has_many :screenings

  # def screenings
  #   screenings_as_user2.or.screenings_as_user1.or.screenings_as_user3
  # end
end
