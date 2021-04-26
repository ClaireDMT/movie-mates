class GenresJob < ApplicationJob
  queue_as :default

  def perform
    FetchAllGenres.call
  end
end
