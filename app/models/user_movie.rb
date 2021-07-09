class UserMovie < ApplicationRecord
  belongs_to :movie
  belongs_to :user
  validates :rating, inclusion: { in: 1..10}
end
