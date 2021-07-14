class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
  has_many :screenings_as_user1, class_name: 'Screening', foreign_key: 'user1_id'
  has_many :screenings_as_user2, class_name: 'Screening', foreign_key: 'user2_id'
  has_many :screenings_as_user3, class_name: 'Screening', foreign_key: 'user3_id'
  has_many :user_movies
  has_friendship

  def jwt_payload
    { email: email }
  end

  def screenings
    Screening.where(user1: self).or(Screening.where(user2: self)).or(Screening.where(user3: self))
  end
end
