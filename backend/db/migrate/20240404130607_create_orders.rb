# frozen_string_literal: true

# Orders
class CreateOrders < ActiveRecord::Migration[7.0]
	def change
		create_table :orders do |t|
			t.friendly_id # unique friendly id for order (generated from id)

			t.decimal :subtotal_amount, index: false, null: true, precision: 10, scale: 2 # total price for all products in order excluding tax or shipping
			t.decimal :shipping_amount, index: false, null: true, precision: 10, scale: 2 # total shipping price
			t.decimal :tax_amount, index: false, null: true, precision: 10, scale: 2 # total tax amount
			t.decimal :total_amount, index: false, null: true, precision: 10, scale: 2 # grand total including product prices, shipping and tax

			t.references :customer, foreign_key: { to_table: 'customers' }, index: true, null: false
			t.references :order_address, foreign_key: { to_table: 'order_addresses' }, index: true, null: false
			t.references :shipping, foreign_key: { to_table: 'shippings' }, index: true, null: false

			t.timestamps
		end
	end
end
