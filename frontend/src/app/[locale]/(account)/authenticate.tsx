'use client'

import type { NextPage } from 'next'
import { type ReactNode, useEffect } from 'react'

import { useRouter } from '@/navigation'

import useCustomer from '@/components/common/customer/use_customer'
import NotReady from '@/components/common/not_ready'

export type AuthenticateProps = {
	children: ReactNode
}

/**
 * authenticates customer (redirects to login if user is not authenticated)
 * @param props Authenticate props
 * @param props.children children
 * @returns children
 */
const Authenticate: NextPage<AuthenticateProps> = ({ children }: AuthenticateProps) => {
	const { isAuthenticated, isReady } = useCustomer()
	const { replace } = useRouter()

	useEffect(() => {
		if (isReady && !isAuthenticated) {
			replace('/login')
		}
	}, [isReady, isAuthenticated])

	if (!isReady || !isAuthenticated) {
		return <NotReady />
	}

	return children
}

export default Authenticate