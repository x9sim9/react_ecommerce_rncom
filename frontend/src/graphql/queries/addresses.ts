import { gql } from '@apollo/client'

import { Address, QueryAddressesArgs, type QueryAddressesQuery } from '@/graphql/schema/graphql'

export { type Address } from '../schema/graphql'

export type AddressResult = QueryAddressesQuery
export type AddressProps = QueryAddressesArgs
export type Addresses = [Address]

export const addressesQuery = gql`
	query QueryAddresses($id: ID) {
		addresses(id: $id) {
			id
			line1
			line2
			city
			postcode
		}
	}
`

export const addressesFragments = gql`
	fragment addressAll on Address {
		id
		line1
		line2
		city
		postcode
	}
`