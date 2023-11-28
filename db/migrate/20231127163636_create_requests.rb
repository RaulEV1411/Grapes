class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.integer :identification_number
      t.references :subject, foreign_key: true
      t.timestamps
    end
  end
end
