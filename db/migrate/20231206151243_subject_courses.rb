class SubjectCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :subject_courses do |t|
      t.references :subject, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
    end
  end
end