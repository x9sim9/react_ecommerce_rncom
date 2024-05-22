import { gql } from '@apollo/client'

import { type QueryShippingQuery, QueryShippingsArgs, Shipping } from '@/graphql/schema/graphql'

export { type Shipping } from '../schema/graphql'

export type ShippingResult = QueryShippingQuery
export type ShippingProps = QueryShippingsArgs
export type Shippings = [Shipping]

export const shippingsQuery = gql`
	query QueryShipping($id: ID) {
		shippings(id: $id) {
			id
			name
			description
			price
		}
	}
`

export const shippingFragments = gql`
	fragment shippingAll on Shipping {
		id
		name
		description
		price
	}
`