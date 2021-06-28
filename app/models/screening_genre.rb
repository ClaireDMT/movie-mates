class ScreeningGenre < ApplicationRecord
  belongs_to :genre
  belongs_to :screening
end
