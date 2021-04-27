module Api
  module V1
    class MoviesController < ApplicationController
      def show
        movie = Movie.find(params[:id])

        render json: MovieSerializer.new(movie, include: [:crews]).serializable_hash.to_json
      end
    end
  end
end
