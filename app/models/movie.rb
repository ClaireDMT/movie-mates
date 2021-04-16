class Movie < ApplicationRecord
  belongs_to :director, class_name: "Crew"
end
