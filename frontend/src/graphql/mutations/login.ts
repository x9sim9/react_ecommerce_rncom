import { gql } from '@apollo/client'

import { type LoginMutationInput, LoginMutationPayload, MutationLoginMutation } from '@/graphql/schema/graphql'
import type { Session } from '@/graphql/types'

export type LoginResultItem = {
	session: Session
} & Omit<LoginMutationPayload, 'session'>

export type LoginResult = {
	login: {
		session: Session
	} & Omit<MutationLoginMutation['login'], 'session'>
} & Omit<MutationLoginMutation, 'login'>
export type { Session } from '@/graphql/types'
export type LoginProps = LoginMutationInput

export const loginMutation = gql`
	mutation MutationLogin($emailAddress: String!, $password: String!) {
		login(input: { emailAddress: $emailAddress, password: $password }) {
			result
			errors
			showError
			token
			session {
				id
				customer {
					id
					friendlyId
					firstName
					lastName
					emailAddress
					phoneNumber
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
	}
`