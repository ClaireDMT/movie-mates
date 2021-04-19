require 'open-uri'
require 'nokogiri'

class ImdbScraperService
	def call(imdb_id)
		url = "https://www.imdb.com/title/#{imdb_id}/"
		html_file = URI.open(url).read
		html_doc = Nokogiri::HTML(html_file)
		# rating
		rating = html_doc.search(".imdbRating [itemprop='ratingValue']")[0]
		rating = rating.text.strip.to_f if rating
		# number of ratings
		rating_number = html_doc.search(".imdbRating [itemprop='ratingCount']")[0]
		rating_number = rating_number.text.delete(",").to_i if rating_number
		{rating: rating, rating_number: rating_number }
	end
end
