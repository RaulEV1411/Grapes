class User < ApplicationRecord
  rolify
  has_many_attached :photo
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,:recoverable,:rememberable,:validatable,
  :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist 
  

  def jwt_payload
    { 'foo' => 'bar' }
  end
  
  # Include default devise modules. Others available are: self
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
end
