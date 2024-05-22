# typed: strict
# frozen_string_literal: true

module Types
	# Shopping Cart Details
	class ShoppingCartType < Types::BaseObject
		description 'shopping cart details'

		field :id, ID, null: false, description: 'unique id for shopping cart'
		field :line_items, [LineItemType], null: true, description: 'all Line Items for shopping cart'
		field :session, SessionType, null: false, description: 'session for shopping cart'
		field :session_id, Integer, null: false, description: 'unique id for Session'
	end
end
