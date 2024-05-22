# typed: strict
# frozen_string_literal: true

module Queries
	# Customer Addresses
	class AddressesQuery < BaseQuery
		extend T::Sig
		include Graphql::QueryConcern

		type [Types::AddressType], null: true
		description 'customer address details'

		argument :id, ID, required: false, description: 'unique id for address'
		argument_pagination

		AddressesResult = T.type_alias { [{
				id: Integer,
				line1: String,
				line2: String,
				city: String,
				postcode: String
		}] }

		# resolves graphql query
		sig { params(id: T.nilable(String), pagination_params: T.untyped).returns(T.nilable(T.any(ActiveRecord::Relation, ActiveRecord::AssociationRelation))) }
		def resolve(id: nil, **pagination_params)
			addresses = context[:session]&.customer&.addresses
			if id.present?
				addresses = addresses&.where(id:)
			end
			paginate(addresses&.order(updated_at: :desc), **pagination_params)
		end
	end
end
