class FetchMovies < ApplicationService
  PATH_MOVIES = "discover/movie"
  QUERY = "&include_adult=false&primary_release_year="

  def initialize
    @fetch_movie = FetchMovie.new
    @fetch_cast = FetchCast.new
  end

  def call(year)
    pages = api_query(PATH_MOVIES, QUERY + year.to_s)["total_pages"]
    (1..pages).map { |page| fetch_movies(page, QUERY + year.to_s) }.sum
  end

  private

  def fetch_movies(page, query)
    results = api_query(PATH_MOVIES, query + "&page=#{page}")["results"]
    puts "starting page #{page}"
    saved = results.map do |result|
      movie = @fetch_movie.call(result) if not_in_db?(result['id'])
      p "fetching cast and director!"
      @fetch_cast.call(movie) if movie
      movie ? true : false
    end
    p "----------------- end of page #{page} -------------------"
    saved.count(true)
  end

  def not_in_db?(tmdb_id)
    Movie.find_by(tmdb_id: tmdb_id).nil?
  end
end
