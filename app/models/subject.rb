class Subject < ApplicationRecord
    has_many :subject_courses
    has_many :courses, through: :subject_courses
end
