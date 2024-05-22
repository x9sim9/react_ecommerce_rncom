/** Order and Shopping Cart Line Items */

import { type LineItem as GraphqlLineItem, type Product } from '@/graphql/schema/graphql'

export type LineItem = {
	product: Product
} & Omit<GraphqlLineItem, 'product'>

export type LineItems = LineItem[]