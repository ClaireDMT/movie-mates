module MoviesGraber
  class FetchMovies < ApplicationService
    PATH_MOVIES = "discover/movie"
    QUERY = "&include_adult=false&primary_release_year="

    def call(year)
      pages = api_query(PATH_MOVIES, QUERY + year.to_s)["total_pages"]
      (1..2).sum { |page| fetch_movies(page, QUERY + year.to_s) }
    end

    private

    def fetch_movies(page, query)
      results = api_query(PATH_MOVIES, query + "&page=#{page}")["results"]
      puts "starting page #{page}"
      saved = results.map do |result|
        movie = FetchMovie.call(result) if not_in_db?(result['id'])
        if movie
          p "adding genre to movies!"
          AddMovieGenres.call(result["genre_ids"], movie)
          p "fetching cast and director!"
          FetchCast.call(movie)
        end
        movie ? true : false
      end
      p "----------------- end of page #{page} -------------------"
      saved.count(true)
    end

    def not_in_db?(tmdb_id)
      Movie.find_by(tmdb_id: tmdb_id).nil?
    end
  end
end
