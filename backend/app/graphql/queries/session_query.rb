# typed: strict
# frozen_string_literal: true

module Queries
	# User Session
	class SessionQuery < BaseQuery
		extend T::Sig
		include Graphql::QueryConcern

		type Types::SessionType, null: true
		description 'session details if session exists'

		# resolves graphql query
		sig { returns(T.nilable(T.nilable(Session))) }
		def resolve
			context[:session]
		end
	end
end
