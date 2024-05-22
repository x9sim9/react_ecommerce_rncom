'use client'

import { isEqual } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import apollo, { ApolloQueryResult, FetchResult } from '@/connections/apollo/client'
import { createOrderMutation, CreateOrderProps, CreateOrderResult, CreateOrderResultItem } from '@/graphql/mutations/create_order'
import { logger } from '@/helpers/logger'
import { type UseErrorErrors, useErrors, type UseErrorsResult } from '@/helpers/mutation_helper/use_errors'
import type { Empty } from '@/helpers/typescript'
import { cartSelector, customerSelector } from '@/lib/store'

import { setCustomer } from '@/components/common/customer/customer_slice'
import { Customer } from '@/components/common/customer/customer_slice'
import useSession from '@/components/common/session/use_session'

import { Cart, emptyCart } from './cart_slice'

export { type CreateOrderProps } from '@/graphql/mutations/create_order'

export type UseCheckoutProps = Empty

export type UseCheckoutResult = {
	cart: Cart,
	createOrder: (props: CreateOrderProps) => Promise<CreateOrderResultItem>,
	customer: Customer,
	errors: UseErrorErrors[],
	isReady: boolean
	resetErrors: UseErrorsResult<object>['resetErrors']
}

export type UseCheckoutResultFn = (props?: UseCheckoutProps) => UseCheckoutResult

/**
 * checkout
 * @returns cart, customer and checkout helper functions
 */
export const useCheckout: UseCheckoutResultFn = () => {
	const cart = useSelector(cartSelector, isEqual)
	const customer = useSelector(customerSelector, isEqual)
	const dispatch = useDispatch()
	const { isReady: isSessionReady, session } = useSession()
	const { errors, parseErrors, resetErrors } = useErrors()

	return {
		cart,
		createOrder: async ({
			addressCity, addressId, addressLine1, addressLine2,
			addressPostcode, customerConfirmPassword, customerEmailAddress, customerFirstName,
			customerLastName, customerPassword, customerPhoneNumber, shippingId,
		}) => {
			logger.debug('storefront.shoppingCart.useCheckout', 'createOrder', {
				params: {
					addressCity, addressId, addressLine1, addressLine2, addressPostcode, customerConfirmPassword, customerEmailAddress,
					customerFirstName, customerLastName, customerPassword, customerPhoneNumber,
				},
			})

			const result = await apollo.mutate<CreateOrderResult, CreateOrderProps>({
				mutation: createOrderMutation,
				variables: {
					addressCity, addressId, addressLine1, addressLine2, addressPostcode, customerConfirmPassword, customerEmailAddress,
					customerFirstName, customerLastName, customerPassword, customerPhoneNumber, shippingId,
				},
			})

			parseErrors<CreateOrderResult>(result as FetchResult<ApolloQueryResult<CreateOrderResult>>)

			const response = result.data?.createOrder as CreateOrderResultItem

			if (response.result) {
				dispatch(emptyCart())

				if (response.customer) {
					dispatch(setCustomer({ customer: response.customer }))
				}
			}

			logger.debug('storefront.shoppingCart.useCheckout', 'createOrder', { result: response })
			return response
		},
		customer,
		errors,
		isLoading: cart.isLoading || customer.isLoading,
		isReady: !cart.isLoading && !customer.isLoading && isSessionReady,
		resetErrors,
	}
}

export default useCheckout