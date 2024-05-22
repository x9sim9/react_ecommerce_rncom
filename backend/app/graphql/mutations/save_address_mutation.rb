# typed: false
# frozen_string_literal: true

module Mutations
	# CUD (Create, Update or Delete) for customer Address
	class SaveAddressMutation < BaseMutation
		include Graphql::MutationConcern

		description 'CUD (Create, Update or Delete) for customer Address'

		argument_cud
		argument :city, String, required: false, description: 'city of address'
		argument :id, ID, required: false, description: 'unique id for address'
		argument :line1, String, required: false, description: 'first line of address'
		argument :line2, String, required: false, description: 'second line of address'
		argument :postcode, String, required: false, description: 'postcode of address'

		field_mutation
		field :address, Types::AddressType, null: true, description: 'target Address for customer'

		# resolves graphql mutation
		sig { params(operation: String, id: T.nilable(String), line1: T.nilable(String),
				line2: T.nilable(String), city: T.nilable(String), postcode: T.nilable(String))
				.returns(T.nilable(MutationResultResult)) }
		def resolve(operation:, id: nil, line1: nil, line2: nil, city: nil, postcode: nil)
			session = context[:session]

			success, address, error = resolve_cud(id:, operation:, model: Address,
					find_params: { customer: session&.customer },
					save_params: { line1:, line2:, city:, postcode: })

			if success
				mutation_result(result: true, address:)
			else
				if error
					return error
				end

				mutation_result(result: false, error: 'An unexpected error occurred please try again layer', show_error: true)
			end
		rescue StandardError => e
			mutation_exception(e)
		end
	end
end
