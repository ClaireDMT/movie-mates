class FetchAllGenres < ApplicationService
  def call
    p "fetch"
    genres = api_query("genre/movie/list")["genres"]
    inserted = genres.map do |genre|
      p genre
      Genre.new(name: genre["name"], tmdb_id: genre["id"]).save
    end
    records_created(inserted.count(true))
  end
end
