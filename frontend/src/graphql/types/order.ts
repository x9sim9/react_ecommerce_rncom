/** Order */

import { LineItem, type Order as GraphqlOrder, OrderProduct } from '@/graphql/schema/graphql'

export type Order = {
	lineItems: ({
		product: OrderProduct
	} & Omit<LineItem, 'product'>)[]
} & Omit<GraphqlOrder, 'lineItems'>

export type Orders = Order[]