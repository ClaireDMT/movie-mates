class Api::V1::UserMoviesController < ApplicationController
  def index
    render json: MovieSerializer.new(current_user.movies_to_watch).serializable_hash.to_json
  end

  def create
    @movie = Movie.find(params[:user_movie][:movie_id])
    @user_movie = UserMovie.new(watched: params[:user_movie][:watched], movie: @movie, user: current_user, toWatch: params[:user_movie][:toWatch])
    @user_movie.rating = 0 if  @user_movie.watched
    if @user_movie.save
      render json: @user_movie.to_json
    else
      render json: @user_movie.errors.messages.to_json
    end
  end
end
