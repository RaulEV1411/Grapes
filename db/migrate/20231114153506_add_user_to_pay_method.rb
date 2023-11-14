class AddUserToPayMethod < ActiveRecord::Migration[7.0]
  def change
    add_reference :pay_methods, :users, foreign_key: true
  end
end
