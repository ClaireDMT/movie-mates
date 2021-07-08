module Api
  module V1
    class MoviesController < ApplicationController
      def index
        @screening = Screening.find(params[:screening_id])
        @screening_genres = @screening.genres.pluck(:id)
        @movies = Movie.joins(:genres).where(genres: {id: @screening_genres}).distinct.order('imdb_rating desc').limit(10)()
        render json: MovieSerializer.new(@movies).serializable_hash.to_json
      end

      def show
        movie = Movie.find(params[:id])
        render json: MovieSerializer.new(movie, include: [:crews]).serializable_hash.to_json
      end
    end
  end
end
