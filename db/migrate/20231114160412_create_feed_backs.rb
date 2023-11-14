class CreateFeedBacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feed_backs do |t|
      t.string :comments
      t.integer :qualification
      t.timestamps
      t.belongs_to :course
      t.belongs_to :user 
    end
  end
end
