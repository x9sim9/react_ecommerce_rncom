# typed: strict
# frozen_string_literal: true

module Types
	module Unions
		# Owner for Line Item (Shopping Cart or Order)
		class LineItemProductOwnerType < Types::BaseUnion
			extend T::Sig

			description 'owner for Line Item'
			possible_types OrderType, ShoppingCartType

			sig { params(object: LineItem, _context: T.untyped)
					.returns(T.any(T.class_of(Types::OrderType), T.class_of(Types::ShoppingCartType))) }
			def self.resolve_type(object, _context)
				if object.is_a?(Order)
					Types::OrderType
				else
					Types::ShoppingCartType
				end
			end
		end
	end
end
