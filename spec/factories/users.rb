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

FactoryBot.define do
    factory :user do
        first_name { "chuty" }
        last_name { "ulloa" }
        birth_date { Faker::Date.birthday(min_age: 18, max_age: 65) }
        email { "joseph@gmail.com" }
        password { 'password123' } # Puedes ajustar la contraseña según tus necesidades
        password_confirmation { 'password123' }
    end
end