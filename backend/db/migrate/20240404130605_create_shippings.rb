# frozen_string_literal: true

# Shipping Types
class CreateShippings < ActiveRecord::Migration[7.0]
	def change
		create_table :shippings do |t|
			t.string :name, index: true, null: false # name for shipping type
			t.string :description, null: true # description for shipping type
			t.decimal :price, index: true, null: false, precision: 10, scale: 2 # price for shipping type

			t.timestamps
		end
	end
end
