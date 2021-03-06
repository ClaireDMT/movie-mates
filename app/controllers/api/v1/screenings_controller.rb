module Api
  module V1
    class ScreeningsController < ApplicationController
      before_action :set_screening, only: [:show, :matches]

      def create
        @screening = Screening.new(screening_params)
        @screening.user1 = current_user
        if @screening.save
          render json: ScreeningSerializer.new(@screening).serializable_hash.to_json
        else
          render json: {}, status: 401
        end
      end

      def show
        render json: ScreeningSerializer.new(@screening).serializable_hash.to_json
      end

      def matches
        @movies = @screening.screening_movies.where(status: 2).extract_associated(:movie)
        render json: MovieSerializer.new(@movies).serializable_hash.to_json
      end

      private

      def set_screening
        @screening = Screening.find(params[:id])
      end

      def screening_params
        params.require(:screening).permit(:user2_id)
      end
    end
  end
end
