# typed: strict
# frozen_string_literal: true

module Queries
	# Orders
	class OrdersQuery < BaseQuery
		extend T::Sig
		include Graphql::QueryConcern

		type [Types::OrderType], null: true
		description 'order details for current authenticated user'

		argument :id, ID, required: false, description: 'unique id for order'
		argument_pagination

		# resolves graphql query
		sig { params(id: T.nilable(String), pagination_params: T.untyped).returns(T.nilable(ActiveRecord::Relation)) }
		def resolve(id: nil, **pagination_params)
			return if context[:session]&.customer.blank?

			orders = Order.auto_include(true)
			if id.present?
				orders = orders.where(id:, customer: context[:session].customer)
			elsif context[:session]&.customer.present?
				orders = orders.where(customer: context[:session].customer)
			end
			paginate(orders&.order(created_at: :desc), **pagination_params)
		end
	end
end
