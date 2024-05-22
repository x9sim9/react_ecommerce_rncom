'use server'

import type { NextPage } from 'next'
import { lazy } from 'react'

import { type Order } from '@/graphql/queries/orders'

import PageSuspense from '@/components/account/page_suspense'

const OrderPageContent = lazy(() => import('@/app/[locale]/(account)/account/orders/[orderId]/page_content'))

import { Loading } from '@/components/ui'

export type OrderPageProps = {
	params: {
		orderId: Order['id']
	}
}

/**
 * account all orders page
 * @param props OrdersPage props
 * @param props.params page params
 * @param props.params.orderId the order id
 * @returns page content
 */
const OrderPage: NextPage<OrderPageProps> = async ({ params: { orderId } }: OrderPageProps) => (
	<PageSuspense fallback={<>
		<Loading className="h-[128px]" type="contentBlock"/>
		<Loading className="h-[128px]" type="contentBlock"/>
		<Loading className="h-60" type="contentBlock"/>
	</>}>
		<OrderPageContent orderId={orderId}/>
	</PageSuspense>
)

export default OrderPage