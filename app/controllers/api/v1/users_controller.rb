module Api
  module V1
    class UsersController < ApplicationController
      def friends
        if user_signed_in? && !current_user.friends.blank?
          render json: UserSerializer.new(current_user.friends).serializable_hash.to_json
        else
          render json: {}, status: 401
        end
      end
    end
  end
end
