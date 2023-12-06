class SubjectCourse < ApplicationRecord
    belongs_to :subject
    belongs_to :course
end