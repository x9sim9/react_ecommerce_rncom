# typed: strict
# frozen_string_literal: true

module Types
	# BaseType for Objects
	class BaseObject < GraphQL::Schema::Object
		extend T::Sig

		defined?(Types::BaseEdge) && edge_type_class(Types::BaseEdge)
		connection_type_class(Types::BaseConnection)
		field_class Types::BaseField

		sig { void }
		def self.field_friendly_id
			field :friendly_id, String, null: false, description: 'unique user friendly id for record'
		end
	end
end
