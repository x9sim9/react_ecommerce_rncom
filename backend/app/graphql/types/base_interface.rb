# typed: false
# frozen_string_literal: true

module Types
	# BaseType for Interfaces
	module BaseInterface
		extend T::Sig
		extend T::Helpers

		include GraphQL::Schema::Interface

		edge_type_class(Types::BaseEdge)
		connection_type_class(Types::BaseConnection)

		field_class Types::BaseField
	end
end
