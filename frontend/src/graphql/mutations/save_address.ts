import { gql } from '@apollo/client'

import { MutationSaveAddressMutation, type SaveAddressMutationInput, SaveAddressMutationPayload } from '@/graphql/schema/graphql'

type MutationCreate<T> = Omit<T, 'id' | 'operation'>
type MutationUpdate<T> = Omit<T, 'operation'>
type MutationDelete<T extends { [key: string]: unknown }> = Pick<T, 'id'>

export type SaveAddressResult = MutationSaveAddressMutation
export type SaveAddressResultItem = SaveAddressMutationPayload
export type SaveAddressProps = SaveAddressMutationInput

export type SaveAddressCreateProps = MutationCreate<SaveAddressProps>
export type SaveAddressUpdateProps = MutationUpdate<SaveAddressProps>
export type SaveAddressDeleteProps = MutationDelete<SaveAddressProps>

export { Operation } from '@/graphql/schema/graphql'

export const saveAddressMutation = gql`
	mutation MutationSaveAddress($operation: Operation!, $id: ID, $line1: String, $line2: String, $city: String, $postcode: String) {
		saveAddress(input: { operation: $operation, id: $id, line1: $line1, line2: $line2, city: $city, postcode: $postcode }) {
			result
			errors
			showError
			address {
				id
				line1
				line2
				city
				postcode
			}
		}
	}
`