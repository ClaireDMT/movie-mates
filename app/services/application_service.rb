class ApplicationService
  def self.call(...)
    new.call(...)
  end

  def api_query(path, query = "")
    url = "https://api.themoviedb.org/3/#{path}?api_key=#{ENV['TMDB_API_KEY']}&language=en-GB&#{query}"
    JSON.parse(Faraday.get(url).body)
  end

  def records_created(count)
    "#{count} records created!"
  end
end
