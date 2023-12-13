class Course < ApplicationRecord
    belongs_to :subject, class_name: 'Subject' , optional: true
    has_many :subject_courses, dependent: :destroy
    has_many :subjects, through: :subject_courses, dependent: :destroy
    
end
