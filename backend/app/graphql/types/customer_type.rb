# typed: strict
# frozen_string_literal: true

module Types
	# Customer details
	class CustomerType < Types::BaseObject
		description 'customer details'

		field_friendly_id
		field :addresses, [AddressType], null: true, description: 'all addresses for customer'
		field :email_address, String, null: false, description: 'customer email address'
		field :first_name, String, null: false, description: 'customer first name'
		field :id, ID, null: false, description: 'unique id for customer'
		field :last_name, String, null: false, description: 'customer last name'
		field :phone_number, String, null: false, description: 'customer phone number'
	end
end
