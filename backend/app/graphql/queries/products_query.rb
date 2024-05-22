# typed: strict
# frozen_string_literal: true

module Queries
	# Product Information
	class ProductsQuery < BaseQuery
		extend T::Sig
		include Graphql::QueryConcern

		type [Types::ProductType], null: true
		description 'product details'

		# order products by field
		class ProductOrderBy < Types::BaseEnum
			description 'order products by field'

			value 'NAME', 'order by product name'
			value 'PRICE', 'order by product price'
		end

		# order product results direction
		class ProductOrder < Types::BaseEnum
			description 'order product results direction'

			value 'ASC', 'order ascending'
			value 'DESC', 'order descending'
		end

		argument :category_id, Int, required: false, description: 'unique id for Category'
		argument :id, ID, required: false, description: 'the id of the product'
		argument :order, ProductOrder, required: false, description: 'order product results direction'
		argument :order_by, ProductOrderBy, required: false, description: 'order products by field'
		argument_pagination

		# resolves graphql query
		sig do
			params(id: T.nilable(String), category_id: T.nilable(Integer), order_by: T.nilable(T.any(Symbol, String)),
					order: T.nilable(T.any(Symbol, String)), pagination_params: T.untyped).returns(T.nilable(ActiveRecord::Relation))
		end
		def resolve(id: nil, category_id: nil, order_by: :name, order: :asc, **pagination_params)
			products = if id.present?
				Product.where(id:)
			elsif category_id.present?
				Product.where(category_id:)
			else
				Product.all
			end

			paginate(products.auto_include(true).order("#{order_by.to_s.downcase}": order.to_s.downcase),
					**pagination_params)
		end
	end
end
