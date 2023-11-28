class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    if user.has_role? :moderator
      can :manage, :all
      can :assign_roles, User
      can :read, :all
    elsif user.has_role? :admin
      can :manage, User, id: user.id
      can :read, :all
    elsif user.has_role? :user
      can :read, :all
    end
  end
end
