'use client'

import { isEqual } from 'lodash'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apollo, { ApolloQueryResult, FetchResult } from '@/connections/apollo/client'
import { loginMutation, type LoginProps, type LoginResult, type LoginResultItem } from '@/graphql/mutations/login'
import { isDevelopment, logger } from '@/helpers/logger'
import { useErrors } from '@/helpers/mutation_helper'
import type { UseErrorErrors, UseErrorsResult } from '@/helpers/mutation_helper/use_errors'
import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'
import { customerSelector } from '@/lib/store'

import { Customer, finishedLoading as customerFinishedLoading, logout, setCustomer, startLoading as customerStartLoading } from '@/components/common/customer/customer_slice'
import { finishedLoading as sessionFinishedLoading, setSession, startLoading as sessionStartLoading } from '@/components/common/session/session_slice'
import useSession from '@/components/common/session/use_session'
import { useAuthToken } from '@/components/common/use_auth_token'
import { cartFromSession, emptyCart, finishedLoading as cartFinishedLoading, startLoading as cartStartLoading } from '@/components/storefront/shopping_cart/cart_slice'

import { useFlash } from '@/components/ui/flash'

export { type LoginProps } from '@/graphql/mutations/login'

export type UseCustomerProps = Empty

export type UseCustomerResult = {
	customer: Customer
	errors: UseErrorErrors[],
	isAuthenticated: boolean
	isLoading: boolean
	isReady: boolean
	login: ({ emailAddress, password }: LoginProps) => Promise<LoginResultItem>,
	logout: () => Promise<boolean>,
	resetErrors: UseErrorsResult<object>['resetErrors']
}

export type UseCustomerResultFn = (props?: UseCustomerProps) => UseCustomerResult

/**
 * customer
 * @returns the customer and customer helpers
 */
export const useCustomer: UseCustomerResultFn = () => {
	const customer = useSelector(customerSelector, isEqual)
	const dispatch = useDispatch()
	const { isLoading: isSessionLoading, isReady: isSessionReady, session } = useSession()
	const { errors, parseErrors, resetErrors } = useErrors()
	const { deleteToken, setToken } = useAuthToken()
	const { addMessage } = useFlash()

	// eslint-disable-next-line sonarjs/no-duplicate-string
	const t = useTranslation({ component: 'common.customer.useCustomer' })

	if (isDevelopment) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useMemo(() => {
			// eslint-disable-next-line sonarjs/no-duplicate-string
			logger.debug('common.customer.useCustomer', { customer })
		}, [customer])
	}

	return {
		customer,
		errors,
		isAuthenticated: customer?.isAuthenticated,
		isLoading: isSessionLoading || customer?.isLoading,
		isReady: isSessionReady && customer?.isReady,
		login: async ({ emailAddress, password }) => {
			logger.debug('common.customer.useCustomer', 'login', { params: { emailAddress, passwordLength: password.length } })

			dispatch(customerStartLoading())
			dispatch(sessionStartLoading())
			dispatch(cartStartLoading())

			const result = await apollo.mutate<LoginResult, LoginProps>({
				mutation: loginMutation,
				variables: {
					emailAddress,
					password,
				},
			})

			parseErrors<LoginResult>(result as FetchResult<ApolloQueryResult<LoginResult>>)

			const response = result.data?.login as LoginResultItem

			if (response.session) {
				response.session
					? dispatch(setSession({ session: response.session }))
					: dispatch(sessionFinishedLoading())
				response.session.customer
					? dispatch(setCustomer({ customer: response.session.customer }))
					: dispatch(customerFinishedLoading())
				response.session.shoppingCart
					? dispatch(cartFromSession({ shoppingCart: response.session.shoppingCart }))
					: dispatch(cartFinishedLoading())
			} else {
				dispatch(sessionFinishedLoading())
				dispatch(customerFinishedLoading())
				dispatch(cartFinishedLoading())
			}

			if (response.token) {
				setToken({ token: response.token })
			}

			logger.debug('common.customer.useCustomer', 'login', { result: response })
			return response
		},
		logout: async () => {
			addMessage({ id: 'common.customer.useCustomer.logoutSuccess', message: t('logoutSuccess'), type: 'success' })
			dispatch(logout())
			dispatch(emptyCart())
			deleteToken()
			return true
		},
		resetErrors,
	}
}

export default useCustomer