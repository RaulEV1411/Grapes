# This is the User class, which inherits from ApplicationRecord.
# ApplicationRecord is the base class for all models in Rails.
class User < ApplicationRecord
  # This line includes the Rolify library, which provides role management.
  rolify
  # This line sets up an association between the User model and the Active Storage service.
  # It allows each user to have many attached photos.
  has_many_attached :photo
  # This line includes the JTIMatcher revocation strategy from the Devise::JWT library.
  # This strategy revokes JWTs by matching the JTI (JWT ID) claim.
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # This line validates the presence of the first_name attribute.
  validates :first_name, presence: true
  # This line sets up a callback that assigns a default role to the user before it's created.
  before_create :assign_default_role
  # This line includes several modules from the Devise library, which provides user authentication.
  # It also sets the JWT revocation strategy to JwtDenylist.
  devise :database_authenticatable, :registerable,:recoverable,:rememberable,:validatable,
  :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist 

  # This method returns a hash that will be included in the payload of the user's JWT.
  def jwt_payload
    { 'foo' => 'bar' }
  end

  private

  # This method assigns the default role to the user.
  # It checks if the user has any roles, and if not, it adds the :user role.
  def assign_default_role
    self.add_role(:user) unless self.has_any_role?
  end
end