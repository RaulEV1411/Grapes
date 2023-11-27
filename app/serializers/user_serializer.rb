class UserSerializer
  include JSONAPI::Serializer
  attributes :id,:first_name,:last_name,:birth_date,:encrypted_password, :email, :created_at, :updated_at
end
