# typed: strict
# frozen_string_literal: true

module Types
	# Shipping Types
	class ShippingType < Types::BaseObject
		description 'shipping types'

		field :description, String, null: true, description: 'description for shipping type'
		field :id, ID, null: false, description: 'unique id for shipping type'
		field :name, String, null: false, description: 'name for shipping type'
		field :price, Float, null: false, description: 'price for shipping type'
	end
end
