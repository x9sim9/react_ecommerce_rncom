# typed: strict
# frozen_string_literal: true

module Types
	# Customer Address
	class AddressType < Types::BaseObject
		description 'customer address'

		field :city, String, null: false, description: 'city of address'
		field :id, ID, null: false, description: 'unique id for address'
		field :line1, String, null: false, description: 'first line of address'
		field :line2, String, description: 'second line of address'
		field :postcode, String, null: false, description: 'postcode of address'
	end
end
