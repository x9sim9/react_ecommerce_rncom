# typed: strict
# frozen_string_literal: true

module Types
	# Order and Shopping Cart Line Items
	class LineItemType < Types::BaseObject
		description 'order and shopping cart line items'

		field :id, ID, null: false, description: 'unique id for line item'
		field :owner, Types::Unions::LineItemProductOwnerType, null: true, description: 'ShoppingCart or Order'
		field :owner_id, ID, null: true, description: 'unique id for ShoppingCart or Order'
		field :owner_type, String, null: true, description: 'type of owner - ShoppingCart or Order'
		field :product, Types::Unions::LineItemProductType, null: false, description: 'Product or OrderProduct'
		field :product_id, ID, null: false, description: 'unique id for Product or OrderProduct'
		field :product_type, String, null: true, description: 'type of product - Product or OrderProduct'
		field :quantity, Integer, null: false, description: 'quantity of products'
	end
end
