# ApplicationRecord is an abstract class that inherits from ActiveRecord::Base.
# ActiveRecord::Base is the base class for models in Rails that use Active Record, the Rails default ORM.
# ApplicationRecord is the parent class for all your models in Rails 5 and above, providing a place for shared code among models.
class ApplicationRecord < ActiveRecord::Base
  # This line declares ApplicationRecord to be an abstract class.
  # Abstract classes in Rails do not have a corresponding table in the database.
  # They are typically used to share code among other classes that do have tables.
  self.abstract_class = true

  # The following methods are private, meaning they can only be called within this class.

  # This method returns the current user based on the user_id stored in the session.
  # The @current_user instance variable is memoized to avoid unnecessary database queries.
  # If there is no user_id in the session, or if no user is found with that id, current_user will be nil.
  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end