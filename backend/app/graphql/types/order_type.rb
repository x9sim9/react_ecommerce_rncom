# typed: strict
# frozen_string_literal: true

module Types
	# Orders
	class OrderType < Types::BaseObject
		description 'orders'

		field_friendly_id
		field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: 'date and time this order was created'
		field :customer, CustomerType, null: false, description: 'Customer that placed this order'
		field :customer_id, ID, null: false, description: 'unique id for Customer'
		field :id, ID, null: false, description: 'unique id for order'
		field :line_items, [LineItemType], null: false, description: 'Line Items for this order'
		field :order_address, OrderAddressType, null: false, description: 'Address for this order'
		field :order_address_id, ID, null: false, description: 'unique id for Order Address'
		field :shipping, ShippingType, null: false, description: 'Shipping type for this order'
		field :shipping_amount, Float, null: false, description: 'total shipping price'
		field :subtotal_amount, Float, null: false, description: 'total price for all products in order excluding tax or shipping'
		field :tax_amount, Float, null: false, description: 'total tax amount'
		field :total_amount, Float, null: false, description: 'grand total including product prices, shipping and tax'
	end
end
