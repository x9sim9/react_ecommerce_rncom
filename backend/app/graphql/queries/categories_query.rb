# typed: strict
# frozen_string_literal: true

module Queries
	# Product Categories
	class CategoriesQuery < BaseQuery
		extend T::Sig
		include Graphql::QueryConcern

		type [Types::CategoryType], null: false
		description 'product categories'

		argument :id, ID, required: false, description: 'unique id for category'
		argument_pagination

		sig { params(id: T.nilable(String), pagination_params: T.untyped).returns(T.nilable(ActiveRecord::Relation)) }
		def resolve(id: nil, **pagination_params)
			categories = if id.present?
				Category.where(id:)
			else
				Category.order(name: :asc)
			end

			paginate(categories.auto_include(true), **pagination_params)
		end
	end
end
