module Api
  module V1
    class MoviesController < ApplicationController
      def index
        @screening = Screening.find(params[:screening_id])
        @screening_genres = @screening.genres.pluck(:id)
        @movies = Movie.joins(:genres).where(genres: {id: @screening_genres}).where.not(movies: {id: already_swiped_movies}).distinct.order('imdb_rating desc').limit(10).includes(:crews)
        p "already swiped! #{already_swiped_movies} - end"
        render json: MovieSerializer.new(@movies).serializable_hash.to_json
      end

      def show
        movie = Movie.find(params[:id])
        render json: MovieSerializer.new(movie, { params: { include_crews: true }}).serializable_hash.to_json
      end

      private

      #  remove from the swiping list the movies already swiped
      def already_swiped_movies
        @watched = current_user.watched_movies.pluck(:id)
        @swiped_first = ScreeningMovie.where(user1: current_user, screening: @screening).pluck(:movie_id)
        @swiped_second = ScreeningMovie.where(user2: current_user, screening: @screening).pluck(:movie_id)
        return @watched + @swiped_first + @swiped_second
      end
    end
  end
end
