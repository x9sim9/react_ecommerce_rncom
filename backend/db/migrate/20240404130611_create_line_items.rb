# frozen_string_literal: true

# Order and Shopping Cart Line Items
class CreateLineItems < ActiveRecord::Migration[7.0]
	def change
		create_table :line_items do |t|
			t.integer :quantity, null: false # quantity of products

			t.references :product, polymorphic: true, index: true, null: false
			t.references :owner, polymorphic: true, index: true, null: false

			t.timestamps
		end
	end
end
