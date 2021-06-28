User.destroy_all

claire = User.create!(
  email: "claire@test.com",
  password: "azerty",
  first_name: "claire",
  last_name: "demont",
  admin: true)

yannick = User.create!(
  email: "yannick@test.com",
    password: "azerty",
  first_name: "yannick",
  last_name: "Brenz",
  admin: false)

soso = User.create!(
  email: "soso@test.com",
    password: "azerty",
  first_name: "soso",
  last_name: "breuil",
  admin: false)

  # claire sends a friend request to yannick
claire.friend_request(yannick)

# yannick can accept the friend request
yannick.accept_request(claire)

  # claire sends a friend request to yannick
claire.friend_request(soso)

# yannick can accept the friend request
soso.accept_request(claire)


