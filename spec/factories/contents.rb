FactoryBot.define do
    factory :content do
      name { "Test Content" }
      description { "Test Description" }
      course_id { 1 }
    end
  end