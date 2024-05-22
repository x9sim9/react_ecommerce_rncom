# frozen_string_literal: true

# Address for Order (snapshot of the customer address details when order created)
class CreateOrderAddresses < ActiveRecord::Migration[7.0]
	def change
		create_table :order_addresses do |t|
			t.string :line1, index: true, null: false # first line of address
			t.string :line2, index: true, null: true # second line of address
			t.string :city, index: true, null: false # city of address
			t.string :postcode, index: true, null: false # postcode of address

			t.references :address, foreign_key: { to_table: 'addresses', on_delete: :nullify }, null: true, index: true, on_delete: :nullify
			t.timestamps
		end
	end
end
