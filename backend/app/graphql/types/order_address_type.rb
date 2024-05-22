# typed: strict
# frozen_string_literal: true

module Types
	# Address for Order (snapshot of the customer address details when order created)
	class OrderAddressType < Types::BaseObject
		description 'address for order (snapshot of the customer address details when order created)'

		field :address, AddressType, null: false, description: 'customer original Address'
		field :address_id, ID, null: false, description: 'unique id for original customer Address'
		field :city, String, null: false, description: 'city of address'
		field :id, ID, null: false, description: 'unique id for order address'
		field :line1, String, null: false, description: 'first line of address'
		field :line2, String, description: 'second line of address'
		field :postcode, String, null: false, description: 'postcode of address'
	end
end
