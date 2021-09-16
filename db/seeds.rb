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
  picture: "https://images.unsplash.com/photo-1515970501993-dafc9f582f3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  first_name: "yannick",
  last_name: "Brenz",
  admin: false)

soso = User.create!(
  email: "soso@test.com",
  password: "azerty",
  picture: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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

#  Fetch Genre
GenresJob.perform_later

#  Fetch Moive from 2020

MoviesJob.perform_later(2020)
