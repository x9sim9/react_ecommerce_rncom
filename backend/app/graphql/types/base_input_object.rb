# typed: strict
# frozen_string_literal: true

module Types
	# BaseType for Input Objects
	class BaseInputObject < GraphQL::Schema::InputObject
		argument_class Types::BaseArgument
	end
end
