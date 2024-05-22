# typed: strict
# frozen_string_literal: true

module Types
	module Unions
		# Product type for Line Item (Product or Order Product)
		class LineItemProductType < Types::BaseUnion
			extend T::Sig

			description 'product type for Line Item'
			possible_types Types::OrderProductType, Types::ProductType

			# rubocop:disable Lint/UnusedMethodArgument
			sig { params(object: T.any(Product, OrderProduct), context: T.untyped)
					.returns(T.any(T.class_of(Types::ProductType), T.class_of(Types::OrderProductType))) }
			def self.resolve_type(object, context)
				if object.is_a?(Product)
					Types::ProductType
				else
					Types::OrderProductType
				end
			end

			# rubocop:enable Lint/UnusedMethodArgument
		end
	end
end
