class ScreeningGenre < ApplicationRecord
  belongs_to :genre
  belongs_to :screening
  validates :genre, uniqueness: { scope: :screening,
                                  message: "already added!" }
end
