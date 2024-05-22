# typed: strict
# frozen_string_literal: true

module Types
	# BaseType for Unions
	class BaseUnion < GraphQL::Schema::Union
		edge_type_class(Types::BaseEdge)
		connection_type_class(Types::BaseConnection)
	end
end
