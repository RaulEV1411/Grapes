class User < ApplicationRecord
  has_many_attached :photo
  

  include Devise::JWT::RevocationStrategies::JTIMatcher

  
  devise :database_authenticatable, :registerable,:recoverable,:validatable,
  :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist 
  
  # Include default devise modules. Others available are: self
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
end
