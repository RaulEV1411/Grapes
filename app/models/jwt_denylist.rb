# This is the JwtDenylist class, which inherits from ApplicationRecord.
# ApplicationRecord is the base class for all models in Rails.
class JwtDenylist < ApplicationRecord
    # This line includes the Devise::JWT::RevocationStrategies::Denylist module.
    # This module provides a strategy for revoking JWTs by storing them in a denylist.
    include Devise::JWT::RevocationStrategies::Denylist

    # This line sets the table name for this model to 'jwt_denylist'.
    # By default, Rails uses the pluralized version of the class name as the table name.
    # In this case, the default table name would be 'jwt_denylists'.
    # This line is necessary if the table name doesn't follow Rails' default naming convention.
    self.table_name = 'jwt_denylist'
end
