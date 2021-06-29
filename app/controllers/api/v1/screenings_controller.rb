module Api
  module V1
    class ScreeningsController < ApplicationController
      def create
        @screening = Screening.new(screening_params)
        @screening.user1 = current_user
        if @screening.save
          render json: ScreeningSerializer.new(@screening).serializable_hash.to_json
        else
          render json: {}, status: 401
        end
      end

      private

      def screening_params
        params.require(:screening).permit(:user2_id, :user3_id)
      end
    end
  end
end
