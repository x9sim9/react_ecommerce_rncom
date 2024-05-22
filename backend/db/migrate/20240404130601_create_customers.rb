# frozen_string_literal: true

# Customer with login
class CreateCustomers < ActiveRecord::Migration[7.0]
	def change
		create_table :customers do |t|
			t.friendly_id # unique friendly id for customer (generated from id)

			t.string :first_name, index: true, null: false # customer first name
			t.string :last_name, index: true, null: false # customer last name
			t.string :email_address, index: true, null: false # customer email address
			t.string :phone_number, index: true, null: false # customer phone number

			t.string :password_digest, index: true, null: false # encrypted password

			t.timestamps
		end
	end
end
