# typed: strict
# frozen_string_literal: true

module Types
	# User Session
	class SessionType < Types::BaseObject
		description 'user session'

		field :customer, CustomerType, null: true, description: 'customer for the session'
		field :customer_id, Integer, null: true, description: 'unique id for customer'
		field :id, ID, null: false, description: 'unique id for session'
		field :shopping_cart, ShoppingCartType, null: true, description: 'shopping cart for the session'
	end
end
