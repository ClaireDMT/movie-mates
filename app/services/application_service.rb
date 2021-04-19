class ApplicationService
  def fetch(path)
    url = "https://api.themoviedb.org/3/#{path}?api_key=#{ENV['TMDB_API_KEY']}&language=en-GB"
    JSON.parse(Faraday.get(url).body)
  end

  def records_created(count)
    "#{count} records created!"
  end
end
