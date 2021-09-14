module MoviesGraber
  class FetchMovie < ApplicationService
    def call(result)
      p "fetching movie #{result['title']} - #{result['title']}"
      full_movie = api_query("movie/#{result['id']}")
      rating = movie_good?(full_movie)
      puts rating
      if rating
        movie = create_movie(full_movie, rating[:rating])
        p "new movie in db: #{movie.title} - #{movie.tmdb_id}"
      end
      return movie
    end

    private

    def movie_good?(movie)
      @imdb_infos = (movie["imdb_id"]).blank? ? nil : check_rating?(movie["imdb_id"])
      puts @imdb_infos
      return @imdb_infos if good_enough?

      false
    end

    def good_enough?
      @imdb_infos && better_than_5? && many_ratings?
    end

    def better_than_5?
      @imdb_infos[:rating] > 5.0
    end

    def many_ratings?
      @imdb_infos[:rating_number].include?("K") || @imdb_infos[:rating_number].include?("M")
    end

    def check_rating?(imdb_id)
      puts "checking IMDB rating for #{imdb_id}"
      ImdbScraper.call(imdb_id)
    end

    def image_url(file_path)
      config = api_query("configuration")
      "#{config["images"]["base_url"]}/original#{file_path}"
    end

    def create_movie(hash, rating)
      movie = Movie.create!(
        en_title: hash["title"],
        title: hash["original_title"],
        overview: hash["overview"],
        language: hash["original_language"],
        year: hash["release_date"][0..3],
        poster_url: image_url(hash["poster_path"]),
        imdb_id: hash["imdb_id"],
        tmdb_id: hash["id"].to_i,
        imdb_rating: rating
      )
      p movie.errors.full_messages
      return movie
    end
  end
end
