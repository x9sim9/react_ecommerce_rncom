# typed: strict
# frozen_string_literal: true

module Types
	# All GraphQL Mutations
	class MutationType < Types::BaseObject
		description 'all graphql mutations'

		field :add_to_cart, mutation: Mutations::AddToCartMutation, null: false, description: 'add a product to shopping cart, increases quantity if product already exists'
		field :create_order, mutation: Mutations::CreateOrderMutation, null: false, description: 'Create a new order (for authenticated customer or new customer)'
		field :login, mutation: Mutations::LoginMutation, null: false, description: 'login authentication for customer'
		field :save_address, mutation: Mutations::SaveAddressMutation, null: false, description: 'CUD (Create, Update or Delete) for customer Address'
		field :update_cart_quantity, mutation: Mutations::UpdateCartQuantityMutation, null: false, description: 'update or remove a product in the shopping cart'
	end
end
