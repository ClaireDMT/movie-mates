class ScreeningMovie < ApplicationRecord
  belongs_to :movie
  belongs_to :screening
  enum status: %i[voted_by_two voted_by_all]
end
