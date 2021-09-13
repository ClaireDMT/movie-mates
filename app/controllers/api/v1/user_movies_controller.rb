class Api::V1::UserMoviesController < ApplicationController
  def index
    @user_movies = UserMovie.where(user: current_user)
    @movies = @user_movies.extract_associated(:movie)
    render json: MovieSerializer.new(@movies).serializable_hash.to_json
  end

  def create
    @movie = Movie.find(params[:user_movie][:movie_id])
    @user_movie = UserMovie.new(watched: true, movie: @movie, user: current_user)
    if @user_movie.save
      render json: @user_movie.to_json
    else
      render json: @user_movie.errors.messages.to_json
    end
  end
end
