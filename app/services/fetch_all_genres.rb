class FetchAllGenres < ApplicationService
  def call
    genres = api_query("genre/movie/list")["genres"]
    inserted = genres.map do |genre|
      Genre.new(name: genre["name"]).save
    end
    records_created(inserted.count(true))
  end
end
