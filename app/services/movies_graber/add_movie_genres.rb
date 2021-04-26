module MoviesGraber
  class AddMovieGenres < ApplicationService
    def call(genres, movie)
      p genres
      p "adding #{genres.count} genres!"
      genres.each do |tmdb_id|
        MovieGenre.create(genre: find_genre(tmdb_id), movie: movie)
      end
    end

    private

    def find_genre(tmdb_id)
      Genre.find_by(tmdb_id: tmdb_id)
    end
  end
end
