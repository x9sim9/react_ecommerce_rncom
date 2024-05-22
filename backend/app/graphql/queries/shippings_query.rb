# typed: strict
# frozen_string_literal: true

module Queries
	# Shipping Types
	class ShippingsQuery < BaseQuery
		extend T::Sig
		include Graphql::QueryConcern

		type [Types::ShippingType], null: true
		description 'shipping types'

		argument :id, ID, required: false, description: 'unique id for shipping type'
		argument_pagination

		# resolves graphql query
		sig { params(id: T.nilable(String), pagination_params: T.untyped).returns(T.nilable(ActiveRecord::Relation)) }
		def resolve(id: nil, **pagination_params)
			shipping = Shipping
			shipping = if id.present?
				shipping.where(id:)
			else
				shipping.order(name: :asc)
			end

			paginate(shipping, **pagination_params)
		end
	end
end
