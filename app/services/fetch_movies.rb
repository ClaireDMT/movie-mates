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
      if Movie.find_by(tmdb_id: result['id']).nil?
        full_movie = api_query("movie/#{result['id']}")
        movie = create_movie(full_movie)
        movie.save
      end
    end
    saved.count(true)
  end

  def create_movie(hash)
    puts "checking IMDB rating for #{hash["title"]} #{hash["imdb_id"]}"
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
    movie.imdb_rating = imdb[:rating] if imdb[:rating] > 3.0 && imdb[:rating_number] > 100
    return movie
  end
end
