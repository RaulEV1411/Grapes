# FactoryBot.define do
#         factory :user do
#         first_name { "John" }
#         last_name { "Doe" }
#         birth_date {Date.today}
#         email { "john.doe@example.com" }
#         password {"password"}
#         jti {SecureRandom.uuid}
#     # Añade más atributos según sea necesario
#         end
# end

# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    email { 'test@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
