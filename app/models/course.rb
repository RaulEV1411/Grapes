class Course < ApplicationRecord
    has_many :subject_courses, dependent: :destroy
    has_many :subjects, through: :subject_courses, dependent: :destroy
end
