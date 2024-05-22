# frozen_string_literal: true

# Customer Address
class CreateAddresses < ActiveRecord::Migration[7.0]
	def change
		create_table :addresses do |t|
			t.string :line1, index: true, null: false
			t.string :line2, index: true, null: true
			t.string :city, index: true, null: false
			t.string :postcode, index: true, null: false

			t.references :customer, foreign_key: { to_table: 'customers' }, index: true, null: false

			t.timestamps
		end
	end
end
