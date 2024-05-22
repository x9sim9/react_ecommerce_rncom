# typed: strict
# frozen_string_literal: true

module Types
	# BaseType for Fields
	class BaseField < GraphQL::Schema::Field
		argument_class Types::BaseArgument
	end
end
