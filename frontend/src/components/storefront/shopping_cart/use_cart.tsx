'use client'

import { isEqual } from 'lodash'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apollo, { ApolloQueryResult, FetchResult } from '@/connections/apollo/client'
import { addToCartMutation, AddToCartProps, AddToCartResult, AddToCartResultItem } from '@/graphql/mutations/add_to_cart'
import { updateCartQuantityMutation, UpdateCartQuantityProps, UpdateCartQuantityResult, UpdateCartQuantityResultItem } from '@/graphql/mutations/update_cart_quantity'
import { isDevelopment, logger } from '@/helpers/logger'
import { type UseErrorErrors, useErrors, type UseErrorsResult } from '@/helpers/mutation_helper/use_errors'
import type { Empty } from '@/helpers/typescript'
import { cartSelector } from '@/lib/store'

import useSession from '@/components/common/session/use_session'
import { useAuthToken } from '@/components/common/use_auth_token'

import { addToCart, Cart, updateCartQuantity } from './cart_slice'

export { type AddToCartProps } from '@/graphql/mutations/add_to_cart'
export { type UpdateCartQuantityProps } from '@/graphql/mutations/update_cart_quantity'

export type UseCartProps = Empty

export type UseCartResult = {
	addToCart: ({ productId, quantity }: AddToCartProps) => Promise<AddToCartResultItem>,
	cart: Cart
	errors: UseErrorErrors[],
	isReady: boolean
	removeFromCart: ({ productId }: UpdateCartQuantityProps) => Promise<UpdateCartQuantityResultItem>,
	resetErrors: UseErrorsResult<object>['resetErrors']
	updateQuantity: ({ productId, quantity }: UpdateCartQuantityProps) => Promise<UpdateCartQuantityResultItem>
}

export type UseCartResultFn = (props?: UseCartProps) => UseCartResult

type MutationPayload<T> = {
	[key: string]: T
}

/**
 * shopping cart
 * @returns shopping cart and helper functions
 */
export const useCart: UseCartResultFn = () => {
	const cart = useSelector(cartSelector, isEqual)
	const dispatch = useDispatch()
	const { isLoading: isSessionLoading, isReady: isSessionReady, session } = useSession()
	const { errors, parseErrors, resetErrors } = useErrors()
	const { setToken } = useAuthToken()

	if (isDevelopment) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useMemo(() => {
			// eslint-disable-next-line sonarjs/no-duplicate-string
			logger.debug('storefront.shoppingCart.useCart', { cart })
		}, [cart])
	}

	return {
		addToCart: async ({ productId, quantity = 1 }) => {
			logger.debug('storefront.shoppingCart.useCart', 'addToCart', { params: { productId, quantity } })

			const result = await apollo.mutate<AddToCartResult, AddToCartProps>({
				mutation: addToCartMutation,
				variables: {
					productId,
					quantity,
				},
			})

			parseErrors<AddToCartResult>(result as FetchResult<ApolloQueryResult<AddToCartResult>>)

			if (result.data?.addToCart.result && result.data?.addToCart.lineItem) {
				dispatch(addToCart({ lineItem: result.data.addToCart.lineItem as AddToCartResultItem['lineItem'] }))
			}

			const response = result.data?.addToCart as AddToCartResultItem

			if (response.token) {
				setToken({ token: response.token })
			}

			logger.debug('storefront.shoppingCart.useCart', 'addToCart', { result: response })
			return response
		},
		cart,
		errors,
		isLoading: cart?.isLoading || isSessionLoading,
		isReady: cart?.isReady && isSessionReady,
		removeFromCart: async ({ productId }) => {
			logger.debug('storefront.shoppingCart.useCart', 'addToCart', { params: { productId } })

			const result = await apollo.mutate<UpdateCartQuantityResult, UpdateCartQuantityProps>({
				mutation: updateCartQuantityMutation,
				variables: {
					productId,
					quantity: 0,
				},
			})

			parseErrors<UpdateCartQuantityResult>(result as FetchResult<ApolloQueryResult<UpdateCartQuantityResult>>)

			if (result.data?.updateCartQuantity.result) {
				updateCartQuantity({ productId, quantity: 0 })
			}

			const response = result.data?.updateCartQuantity as UpdateCartQuantityResultItem

			logger.debug('storefront.shoppingCart.useCart', 'addToCart', { result: response })
			return response
		},
		resetErrors,
		updateQuantity: async ({ productId, quantity }) => {
			logger.debug('storefront.shoppingCart.useCart', 'addToCart', { params: { productId, quantity } })

			const result = await apollo.mutate<UpdateCartQuantityResult, UpdateCartQuantityProps>({
				mutation: updateCartQuantityMutation,
				variables: {
					productId,
					quantity,
				},
			})

			if (result.data?.updateCartQuantity.result) {
				dispatch(updateCartQuantity({ productId, quantity }))
			}

			parseErrors<UpdateCartQuantityResult>(result as FetchResult<ApolloQueryResult<UpdateCartQuantityResult>>)

			const response = result.data?.updateCartQuantity as UpdateCartQuantityResultItem

			logger.debug('storefront.shoppingCart.useCart', 'addToCart', { result: response })
			return response
		},
	}
}

export default useCart