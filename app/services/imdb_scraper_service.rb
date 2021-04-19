require 'open-uri'
require 'nokogiri'

class ImdbScraperService
	def call(imdb_id)
		url = "https://www.imdb.com/title/#{imdb_id}/"
		html_file = URI.open(url).read
		html_doc = Nokogiri::HTML(html_file)
		rating = html_doc.search(".imdbRating [itemprop='ratingValue']")[0].text.strip.to_f
		rating_number = html_doc.search(".imdbRating [itemprop='ratingCount']")[0].text.delete(",").to_i
		{rating: rating, rating_number: rating_number }
	end
end
