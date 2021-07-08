module Api
  module V1
    class ScreeningMoviesController < ApplicationController
      def create
        @movie = Movie.find(params[:screening_movie][:movie_id])
        @screening = Screening.find(params[:screening_id])
        @screening_movie = ScreeningMovie.find_by(movie: @movie, screening: @screening)

        if @screening_movie
          update_status
          render json: match? ? { screening: @screening_movie.id, match: true } : { screening: @screening_movie.id, match: false }
        else
          @screening_movie = ScreeningMovie.new(movie: @movie, screening: @screening, status: 0)
          if @screening_movie.save
            render json: { screening: @screening_movie.id, status: @screening_movie.status }
          else
            render json: @screening_movies.errors.messages.to_json
          end
        end
      end

      private

      def update_status
        @screening_movie.status = 1
        @screening_movie.save
      end

      def match?
        @screening.user3.nil?
      end
    end
  end
end
