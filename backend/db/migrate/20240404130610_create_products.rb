# frozen_string_literal: true

# Product Information
class CreateProducts < ActiveRecord::Migration[7.0]
	def change
		create_table :products do |t|
			t.friendly_id # unique friendly id for product (generated from id)

			t.string :name, index: true, null: false # name of product
			t.text :description, null: false # description of product
			t.decimal :price, index: true, null: false, precision: 10, scale: 2 # price of product

			t.references :category, foreign_key: { to_table: 'categories' }, index: true, null: false
			t.timestamps
		end
	end
end
