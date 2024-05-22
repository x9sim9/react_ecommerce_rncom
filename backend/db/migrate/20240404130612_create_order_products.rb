# frozen_string_literal: true

# Products in Order (snapshot of the product details when order created)
class CreateOrderProducts < ActiveRecord::Migration[7.0]
	def change
		create_table :order_products do |t|
			t.string :name, index: true, null: false # name of product
			t.decimal :price, index: true, null: false, precision: 10, scale: 2 # price of product

			t.references :product, foreign_key: { to_table: 'products' }, index: true, null: false
			t.timestamps
		end
	end
end
