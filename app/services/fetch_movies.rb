class FetchMovies < ApplicationService
  PATH_MOVIES = "discover/movie"
  QUERY = "&include_adult=false&primary_release_year="

  def call(year)
    pages = api_query(PATH_MOVIES, QUERY + year.to_s)["total_pages"]
    (1..pages).map { |page| fetch_movies(page, QUERY + year.to_s) }.sum
  end

  private

  def fetch_movies(page, query)
    results = api_query(PATH_MOVIES, query + "&page=#{page}")["results"]
    puts "starting page #{page}"
    saved = results.map do |result|
      if not_in_db?(result['id'])
        full_movie = api_query("movie/#{result['id']}")
        imdb_infos = (full_movie["imdb_id"]).blank? ? nil : check_rating?(full_movie["imdb_id"])
        if imdb_infos && imdb_infos[:rating] > 3.0 && imdb_infos[:rating_number] > 100
          movie = create_movie(full_movie, imdb_infos[:rating])
          movie.save
        end
      end
    end
    saved.count(true)
  end

  def not_in_db?(tmdb_id)
    Movie.find_by(tmdb_id: tmdb_id).nil?
  end

  def check_rating?(imdb_id)
    puts "checking IMDB rating for #{imdb_id}"
    ImdbScraperService.new.call(imdb_id)
  end

  def create_movie(hash, rating)
    movie = Movie.new(
      en_title: hash["title"],
      title: hash["original_title"],
      overview: hash["overview"],
      language: hash["original_language"],
      year: hash["release_date"][0..3],
      poster_url: hash["poster_path"],
      imdb_id: hash["imdb_id"],
      tmdb_id: hash["id"].to_i,
      imdb_rating: rating
    )
  end
end
