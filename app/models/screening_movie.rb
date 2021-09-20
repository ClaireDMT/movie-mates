class ScreeningMovie < ApplicationRecord
  belongs_to :movie
  belongs_to :screening
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User", optional: true
  belongs_to :user3, class_name: "User", optional: true
  enum status: %i[voted_by_one voted_by_two voted_by_all], _default: "voted_by_one"
end
