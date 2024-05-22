# typed: strict
# frozen_string_literal: true

# rubocop:disable GraphQL/ObjectDescription
module Types
	# All GraphQL Nodes
	module NodeType
		include Types::BaseInterface
		include GraphQL::Types::Relay::NodeBehaviors
	end
end
# rubocop:enable GraphQL/ObjectDescription
