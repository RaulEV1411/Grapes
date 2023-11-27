class CreateResquests < ActiveRecord::Migration[7.0]
  def change
    create_table :resquests do |t|
      t.integer :person_id
      t.timestamps
    end
  end
end
