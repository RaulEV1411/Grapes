class Modifytables < ActiveRecord::Migration[7.0]
  def change
    # Remove the url column
    remove_column :contents, :url
    remove_column :contents, :content_type_id
    remove_column :courses, :publication_date
    drop_table :content_types


    # Add the foreign key
    add_reference :courses, :user, foreign_key: true
  end
end
