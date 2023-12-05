class User < ApplicationRecord
  rolify
  has_many_attached :photo
  include Devise::JWT::RevocationStrategies::JTIMatcher
  before_create :assign_default_role
  devise :database_authenticatable, :registerable,:recoverable,:rememberable,:validatable,
  :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist 
  

  def jwt_payload
    { 'foo' => 'bar' }
  end

  private

  def assign_default_role
    self.add_role(:user) unless self.has_any_role?
  end
  
  # Include default devise modules. Others available are: self
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
end
