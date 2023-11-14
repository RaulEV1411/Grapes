class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :description
      t.datetime :publication_date,  null: false, default: Date.today
      t.timestamps
    end
    create_table :users_courses do |t|
      t.belongs_to :user
      t.belongs_to :course
      t.timestamps
    end
  end
end
