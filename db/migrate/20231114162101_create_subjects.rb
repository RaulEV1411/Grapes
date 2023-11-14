class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.timestamps
    end
    create_table :subjects_courses do |t|
      t.belongs_to :subject
      t.belongs_to :course
      t.timestamps
    end
  end
end
