# typed: strict
# frozen_string_literal: true

module Mutations
	# Base for all GraphQL Models
	class BaseMutation < GraphQL::Schema::RelayClassicMutation
		extend T::Sig
		argument_class Types::BaseArgument
		field_class Types::BaseField
		input_object_class Types::BaseInputObject
		object_class Types::BaseObject
	end
end
