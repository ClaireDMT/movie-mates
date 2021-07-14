module CrewsGraber
  class FetchCast < ApplicationService
    def call(movie)
      results = api_query("/movie/#{movie.tmdb_id}/credits")
      add_actors(results["cast"].take(9), movie)
      directors = results["crew"].select { |crew| crew["job"] == "Director" }
      add_directors(directors, movie)
    end

    private

    def add_actors(results, movie)
      results.map do |result|
        actor = retrieve_or_create_crew(result)
        MovieCrew.new(movie: movie, crew: actor, job: "Acting").save
      end
    end

    def add_directors(directors, movie)
      directors.each do |result|
        director = retrieve_or_create_crew(result)
        MovieCrew.new(movie: movie, crew: director, job: "Director").save
      end
    end

    # TO DO: as a helper?
    def crew_not_in_db?(tmdb_id)
      Crew.find_by(tmdb_id: tmdb_id)
    end

    def retrieve_or_create_crew(result)
      crew = crew_not_in_db?(result['id'])
      crew = CreateCrew.call(result['id']) if crew.nil?
      return crew
    end
  end
end
