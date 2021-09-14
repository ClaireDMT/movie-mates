class ScreeningMovie < ApplicationRecord
  belongs_to :movie
  belongs_to :screening
  belongs_to :user
  enum status: %i[voted_by_one voted_by_two voted_by_all], _default: "voted_by_one"
end
