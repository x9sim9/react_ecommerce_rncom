import { gql } from '@apollo/client'

import { MutationUpdateCartQuantityMutation, type UpdateCartQuantityMutationInput, UpdateCartQuantityMutationPayload } from '@/graphql/schema/graphql'

export type UpdateCartQuantityResult = MutationUpdateCartQuantityMutation
export type UpdateCartQuantityResultItem = UpdateCartQuantityMutationPayload
export type UpdateCartQuantityProps = UpdateCartQuantityMutationInput

export const updateCartQuantityMutation = gql`
	mutation MutationUpdateCartQuantity($productId: ID!, $quantity: Int!) {
		updateCartQuantity(input: { productId: $productId, quantity: $quantity }) {
			result
			errors
			showError
			newQuantity
		}
	}
`