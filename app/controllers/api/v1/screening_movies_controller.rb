module Api
  module V1
    class ScreeningMoviesController < ApplicationController
      before_action :set_movie_and_screening, only: [:create]
      def create
        @screening_movie = ScreeningMovie.find_by(movie: @movie, screening: @screening)
        if @screening_movie
          update_status
          render json: {match: true ,movie: MovieSerializer.new(@movie).serializable_hash, screening: ScreeningSerializer.new(@screening).serializable_hash }
        else
          @screening_movie = ScreeningMovie.new(movie: @movie, screening: @screening, user1: current_user)
          render json: @screening_movie.save ? @screening_movie : @screening_movies.errors.messages.to_json
        end
      end

      private

      def set_movie_and_screening
        @movie = Movie.find(params[:screening_movie][:movie_id])
        @screening = Screening.find(params[:screening_id])
      end

      def update_status
        @screening_movie.status = match? ? 2 : 1
        @screening_movie.user2 = current_user
        @screening_movie.save
      end

      def match?
        @screening.user3.nil?
      end
    end
  end
end
