class CreateOrdersTable < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.string :filename
      t.text :payload
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
