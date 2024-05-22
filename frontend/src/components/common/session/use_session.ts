'use client'

import { isEqual } from 'lodash'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSuspense } from 'use-react-suspense'

import apollo from '@/connections/apollo/client'
import { Session as SessionType, SessionResult, sessionsQuery } from '@/graphql/queries/session'
import { isDevelopment, logger } from '@/helpers/logger'
import type { Empty } from '@/helpers/typescript'
import { sessionSelector } from '@/lib/store'

import { finishedLoading as customerFinishedLoading, setCustomer, startLoading as customerStartLoading } from '@/components/common/customer/customer_slice'
import { cartFromSession, finishedLoading as cartFinishedLoading, startLoading as cartStartLoading } from '@/components/storefront/shopping_cart/cart_slice'

import { finishedLoading, Session, setSession, startLoading } from './session_slice'

export type UseSessionProps = Empty

export type UseSessionResult = {
	getSession: () => Promise<SessionType>,
	isLoading: boolean,
	isReady: boolean
	session: Session,
}

export type UseSessionResultFn = (props?: UseSessionProps) => UseSessionResult

/**
 * session
 * @returns the session and session helpers
 */
export const useSession: UseSessionResultFn = () => {
	const session = useSelector(sessionSelector, isEqual)
	const dispatch = useDispatch()

	const getSession = async () => {
		dispatch(startLoading())
		dispatch(customerStartLoading())
		dispatch(cartStartLoading())
		// eslint-disable-next-line sonarjs/no-duplicate-string
		logger.debug('common.session.useSession', 'getSession')

		const result = await apollo.query<SessionResult>({
			query: sessionsQuery,
		})

		const response = result.data?.session as SessionType

		if (response) {
			response.customer
				? dispatch(setCustomer({ customer: response.customer }))
				: dispatch(customerFinishedLoading())
			response.shoppingCart
				? dispatch(cartFromSession({ shoppingCart: response.shoppingCart }))
				: dispatch(cartFinishedLoading())

			dispatch(setSession({ session: response }))
		} else {
			dispatch(customerFinishedLoading())
			dispatch(cartFinishedLoading())
			dispatch(finishedLoading())
		}

		logger.debug('common.session.useSession', 'getSession', { result: response })
		return response
	}

	useSuspense(async () => {
		if (!session.isLoading && !session.isReady && !session.isInitialised) {
			await getSession()
		}
	}, [] as const)

	if (isDevelopment) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useMemo(() => {
			logger.debug('common.session.useSession', { session })
		}, [session])
	}

	return {
		getSession,
		isLoading: session?.isLoading,
		isReady: session?.isReady,
		session,
	}
}

export default useSession