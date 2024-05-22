'use client'

import { gql } from '@apollo/client'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

import { useSuspenseQuery } from '@/connections/apollo/ssr'
import { OrderProps, Orders } from '@/graphql/queries/orders'
import { OrderListQueryQuery as OrderListResult } from '@/graphql/schema/graphql'
import { logger } from '@/helpers/logger'
import { useTranslation } from '@/helpers/translation'

import { Currency, Date, Grid, Id, Link } from '@/components/ui'
import SuspenseLoading from '@/components/ui/suspense_loading'
import { Body, D, H, Row, Table } from '@/components/ui/table'

export type OrderListProps = {
	filter?: 'all' | 'recent'
}

/**
 * list of orders
 * @param props OrderList props
 * @param props.filter filter orders
 * @returns the orders
 */
export const OrderList: FC<OrderListProps> = ({ filter = 'all' }) => {
	// eslint-disable-next-line sonarjs/no-duplicate-string
	const t = useTranslation({ component: 'account.order.orderList' })

	const result = useSuspenseQuery<OrderListResult, OrderProps>(gql`
		query OrderListQuery($id: ID) {
			orders(id: $id) {
				...orderBasic
			}
		}`, { fetchPolicy: 'no-cache', variables: { limit: filter === 'recent' ? 5 : undefined } })

	const orders = result.data.orders as Orders
	logger.debug('account.order.orderList', { orders: orders?.map((order) => order.id) })

	return (
		<SuspenseLoading layout={[2, 6, 2, 2]} type="panel">
			<Table border="inner">
				<Body data-testid="account.order.orderList">
					{orders?.map((order) => (
						<Row data-testid="account.order.order" key={order.id}>
							<H>
								<Link data-testid="account.order.orderList.idViewOrderLink" href={`/account/orders/${order.id}`}>
									<Id data-testid="account.order.orderList.orderId">{order.friendlyId}</Id>
								</Link>
							</H>
							<D>
								<Date data-testid="account.order.orderList.orderDate" date={order.createdAt} options="orderDate"/>
							</D>
							<H>
								<Grid gap="xs" size="flex">
									<span data-testid="account.order.orderList.lineItemsLength">{order.lineItems.length}</span>
									<ShoppingCartIcon height={20}/>
								</Grid>
							</H>
							<H>
								<Currency data-testid="account.order.orderList.orderTotal" value={order.totalAmount}/>
							</H>
							<D align="end">
								<Link data-testid="account.order.orderList.viewOrderLink" href={`/account/orders/${order.id}`}>
									{t('viewOrder')}
								</Link>
							</D>
						</Row>
					))}
				</Body>
			</Table>
		</SuspenseLoading>
	)
}

export default OrderList