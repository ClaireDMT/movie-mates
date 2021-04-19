class FetchMovies < ApplicationService
  PATH_MOVIES = "discover/movie"
  QUERY = "&include_adult=false&primary_release_year="

  def call(year)
    pages = api_query(PATH_MOVIES, QUERY + year.to_s)["total_pages"]
    (1..17).map { |page| fetch_movies(page, QUERY + year.to_s) }.sum
  end

  private

  def fetch_movies(page, query)
    results = api_query(PATH_MOVIES, query + "&page=#{page}")["results"]
    saved = results.map do |result|
      full_movie = api_query("movie/#{result['id']}")
      movie = create_movie(full_movie)
      movie.save
    end
    saved.count(true)
  end

  def create_movie(hash)
    imdb = ImdbScraperService.new.call(hash["imdb_id"])
    movie = Movie.new(
      en_title: hash["title"],
      title: hash["original_title"],
      overview: hash["overview"],
      language: hash["original_language"],
      year: hash["release_date"][0..3],
      poster_url: hash["poster_path"],
      imdb_id: hash["imdb_id"],
      tmdb_id: hash["id"].to_i,
    )
    if imdb[:rating] > 3.0 && imdb[:rating_number] > 100
      movie.imdb_rating = imdb[:rating]
    end
    return movie
  end
end
