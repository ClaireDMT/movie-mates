require 'open-uri'
require 'nokogiri'

class ImdbScraper < ApplicationService
  def call(imdb_id)
    url = "https://www.imdb.com/title/#{imdb_id}/"
    html_file = URI.open(url).read
    html_doc = Nokogiri::HTML(html_file)
    rating = html_doc.search(".imdbRating [itemprop='ratingValue']")[0]
    rating_number = html_doc.search(".imdbRating [itemprop='ratingCount']")[0]
    if rating.nil? || rating_number.nil?
      nil
    else
      { rating: rating.text.strip.to_f, rating_number: rating_number.text.delete(",").to_i }
    end
  end
end
