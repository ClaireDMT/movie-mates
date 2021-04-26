module MoviesGraber
  class FetchMovie < ApplicationService
    def call(result)
      p "fetching movie #{result['title']} - #{result['title']}"
      full_movie = api_query("movie/#{result['id']}")
      rating = movie_good?(full_movie)
      if rating
        movie = create_movie(full_movie, rating[:rating])
        p "new movie in db: #{movie.title} - #{movie.tmdb_id}"
      end
      return movie
    end

    private

    def movie_good?(movie)
      imdb_infos = (movie["imdb_id"]).blank? ? nil : check_rating?(movie["imdb_id"])
      return imdb_infos if imdb_infos && imdb_infos[:rating] > 3.0 && imdb_infos[:rating_number] > 100

      false
    end

    def check_rating?(imdb_id)
      puts "checking IMDB rating for #{imdb_id}"
      ImdbScraper.call(imdb_id)
    end

    def create_movie(hash, rating)
      movie = Movie.create(
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
      p movie.errors.full_messages
      return movie
    end
  end
end
