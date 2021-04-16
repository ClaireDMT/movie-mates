class FetchGenre < ApplicationService
  def call
    genres = fetch("genre/movie/list")["genres"]
    inserted = genres.map do |genre|
      Genre.new(name: genre["name"]).save
    end
    records_created(inserted.count(true))
  end
end
