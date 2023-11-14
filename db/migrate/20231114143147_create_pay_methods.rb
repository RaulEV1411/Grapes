class CreatePayMethods < ActiveRecord::Migration[7.0]
  def change
    create_table :pay_methods do |t|
      t.string :payment_type
      t.timestamps
      
    end
  end
end
