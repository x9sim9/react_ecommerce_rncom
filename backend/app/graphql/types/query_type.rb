# typed: strict
# frozen_string_literal: true

module Types
	# All GraphQL Queries
	class QueryType < Types::BaseObject
		include GraphQL::Types::Relay::HasNodeField
		include GraphQL::Types::Relay::HasNodesField

		description 'all graphql queries'

		field :addresses, resolver: Queries::AddressesQuery, description: 'customer address details'
		field :categories, resolver: Queries::CategoriesQuery, description: 'product categories'
		field :orders, resolver: Queries::OrdersQuery, description: 'order details for current authenticated user'
		field :products, resolver: Queries::ProductsQuery, description: 'product details'
		field :session, resolver: Queries::SessionQuery, description: 'session details if session exists'
		field :shippings, resolver: Queries::ShippingsQuery, description: 'shipping types'
	end
end
