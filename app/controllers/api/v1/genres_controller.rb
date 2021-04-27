module Api
  module V1
    class GenresController < ApplicationController
      def index
        genres = Genre.all

        render json: GenreSerializer.new(genres).serializable_hash.to_json
      end
    end
  end
end
