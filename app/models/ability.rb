# The Ability class is used to define the abilities/permissions for users in your application.
# It includes the CanCan::Ability module which provides the methods needed to define these abilities.
class Ability
  include CanCan::Ability

  # The initialize method is called when a new Ability object is created.
  # It takes a user object as a parameter.
  def initialize(user)
    # If the user object is nil, a new User object is created.
    # This could be the case when a user is not logged in.
    user ||= User.new

    # If the user has the 'moderator' role, they can manage all resources,
    # assign roles to users, and read all resources.
    if user.has_role? :moderator
      can :manage, :all
      can :assign_roles, User
      can :read, :all
    # If the user has the 'admin' role, they can manage their own user resource and read all resources.
    elsif user.has_role? :admin
      can :manage, User, id: user.id
      can :read, :all
    # If the user has the 'user' role, they can read all resources.
    elsif user.has_role? :user
      can :read, :all
    # If the user has the 'pending_request' role, they can read all resources.
    elsif user.has_role? :pending_request
      can :read, :all
    end
  end
end

