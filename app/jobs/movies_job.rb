class MoviesJob < ApplicationJob
  queue_as :default

  def perform(year)
    MoviesGraber::FetchMovies.call(year)
  end
end
