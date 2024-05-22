import { gql } from '@apollo/client'

import { type QuerySessionQuery, Session } from '@/graphql/schema/graphql'

export { type Session } from '../types'

export type SessionResult = {
	session: Session
} & Omit<QuerySessionQuery, 'session'>
export type Sessions = Session[]

export const sessionsQuery = gql`
	query QuerySession {
		session {
			id
			customer {
				...sessionCustomer
			}
			shoppingCart {
				lineItems {
					id
					quantity
					product {
						... on Product {
							id
							friendlyId
							name
							price
							description
							image {
								imageBlur
								imageThumbnail
							}
							category {
								id
								name
							}
						}
					}
				}
			}
		}
	}
`

export const sessionFragments = gql`
	fragment sessionCustomer on Customer {
		id
		friendlyId
		firstName
		lastName
		emailAddress
	}
`