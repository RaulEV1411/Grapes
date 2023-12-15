# This is the Role class, which inherits from ApplicationRecord.
# ApplicationRecord is the base class for all models in Rails.
class Role < ApplicationRecord
  # This line sets up a many-to-many relationship between roles and users.
  # The :join_table option specifies the name of the table that should be used for this association.
  has_and_belongs_to_many :users, :join_table => :users_roles

  # This line sets up a polymorphic association with another model.
  # This allows a role to belong to, or be associated with, multiple other models.
  # The :optional => true option means that the associated resource can be nil.
  belongs_to :resource,
             :polymorphic => true,
             :optional => true

  # This line validates the resource_type attribute.
  # It must be included in the array returned by Rolify.resource_types.
  # The :allow_nil => true option means that the attribute can be nil.
  validates :resource_type,
            :inclusion => { :in => Rolify.resource_types },
            :allow_nil => true

  # This line includes the Scopify module, which provides a method for creating scopes based on roles.
  scopify
end
