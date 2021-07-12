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
  # has_many :screenings, -> { with_current_user }, class_name: 'Screening'

  has_many :user_movies
  has_friendship

  def jwt_payload
    { email: email }
  end
end
