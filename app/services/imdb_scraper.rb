require 'open-uri'
require 'nokogiri'

class ImdbScraper < ApplicationService
  def call(imdb_id)
    url = "https://www.imdb.com/title/#{imdb_id}/"
    html_file = URI.open(url).read
    html_doc = Nokogiri::HTML(html_file)
    rating = html_doc.search("[data-testid='hero-rating-bar__aggregate-rating__score'] span:first-child").text.strip.to_f.round(1)
    rating_number = html_doc.search("[data-testid='hero-rating-bar__aggregate-rating__score'] + div + div").text.strip
    if rating.nil? || rating_number.nil?
      nil
    else
      { rating: rating, rating_number: rating_number}
    end
  end
end
