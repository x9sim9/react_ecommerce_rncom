# typed: strict
# frozen_string_literal: true

module Types
	# Products in Order (snapshot of the product details when order created)
	class OrderProductType < Types::BaseObject
		description 'product in order (snapshot of product derails when order created)'

		field :id, ID, null: false, description: 'unique id for order product'
		field :name, String, null: false, description: 'name of product'
		field :price, Float, null: false, description: 'price of product'
		field :product, ProductType, null: false, description: 'original Product'
		field :product_id, ID, null: false, description: 'unique id for original Product'
	end
end
