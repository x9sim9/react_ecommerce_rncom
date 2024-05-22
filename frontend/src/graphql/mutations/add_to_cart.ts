import { gql } from '@apollo/client'

import { type AddToCartMutationInput, AddToCartMutationPayload, type MutationAddToCartMutation } from '@/graphql/schema/graphql'
import type { LineItem } from '@/graphql/types'


export type AddToCartResultItem = {
	lineItem: LineItem
} & Omit<AddToCartMutationPayload, 'lineItem'>
export type AddToCartResult = {
	addToCart: {
		lineItem: AddToCartResultItem['lineItem']
	} & Omit<MutationAddToCartMutation['addToCart'], 'lineItem'>
} & Omit<MutationAddToCartMutation, 'addToCart'>
export type AddToCartProps = AddToCartMutationInput

export const addToCartMutation = gql`
	mutation MutationAddToCart($productId: ID!, $quantity: Int) {
		addToCart(input: { productId: $productId, quantity: $quantity }) {
			result
			errors
			showError
			token
			lineItem {
				id
				quantity
				product {
					... on Product {
						id
						friendlyId
						name
						price
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
`