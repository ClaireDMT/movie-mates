module Api
  module V1
    class ScreeningGenresController < ApplicationController
      def create
        @screening = Screening.find(params[:screening_id])
        @new_genres = params[:screening_genre]
        @existing_genres = @screening.genres
        destroy_uncommon_genres
        create_common_genres if @existing_genres.empty?
        render json: @screening.genres.to_json
      end

      private

      def destroy_uncommon_genres
        @genres_to_destroy = @existing_genres.pluck(:id) - @new_genres
        ScreeningGenre.where(genre: @genres_to_destroy, screening: @screening).destroy_all
      end

      def create_common_genres
        #   intersection of submitted genres    and existing genres
        @common_genres = @new_genres.map do |genre_id|
          { screening: @screening, genre: Genre.find(genre_id) }
        end
        ScreeningGenre.create!(@common_genres)
      end

      def params_screening_genres
      end
    end
  end
end
