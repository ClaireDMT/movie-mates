module CrewsGraber
  class FetchDirector < ApplicationService
    def call(tmdb_id)
      path = "movie/#{tmdb_id}/credits"
      api_query(path)["crew"]
    end
  end
end
