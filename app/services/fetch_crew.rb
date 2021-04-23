class FetchCrew < ApplicationService
  def call(movie_id)
    results = api_query("/movie/#{movie_id}/credits")
    crew_create = CreateCrew.new
    results["cast"].take(30).map do |cast|
      crew = crew_not_in_db?(cast['id'])
      if crew.nil?
        crew = crew_create.call(cast['id'])
      end

    end
    records_created(inserted.count(true))
  end

  # TO DO: as a helper?
  def crew_not_in_db?(tmdb_id)
    Crew.find_by(tmdb_id: tmdb_id)
  end


end
