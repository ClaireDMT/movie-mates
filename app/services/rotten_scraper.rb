require 'open-uri'
require 'nokogiri'

class RottenScraper
	def call(title, year)
		query = { search: title}.to_query
		url = "https://www.rottentomatoes.com/search?search=#{query}"
		html_file = URI.open(url).read
		html_doc = Nokogiri::HTML(html_file)
		html_doc.search("search-result[type='movie'].shadowRoot").each do |element|
			puts element
		end
	end
end

