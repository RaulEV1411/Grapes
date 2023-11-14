class CreateContents < ActiveRecord::Migration[7.0]
  def change
    create_table :contents do |t|
      t.string :name
      t.string :url
      t.string :description
      t.belongs_to :content_type
      t.belongs_to :course
      t.timestamps
    end
  end
end
