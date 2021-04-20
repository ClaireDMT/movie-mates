class FetchCrew < ApplicationService
  def call(move_id)
    results = api_query("/movie/#{movie_id}/credits")
    results["casts"].take(30).map do |cast|
    end
    records_created(inserted.count(true))
  end


end
