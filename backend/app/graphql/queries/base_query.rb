# typed: strict
# frozen_string_literal: true

# GraphQL Queries
module Queries
	extend T::Sig

	# Base for all GraphQL Queries
	class BaseQuery < GraphQL::Schema::Resolver
		argument_class Types::BaseArgument
	end
end
