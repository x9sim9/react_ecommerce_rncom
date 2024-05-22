/** Shopping Cart Details */

import { type ShoppingCart as GraphqlShoppingCart } from '@/graphql/schema/graphql'
import type { LineItems } from '@/graphql/types/line_item'

export type ShoppingCart = {
	lineItems: LineItems
} & Omit<GraphqlShoppingCart, 'lineItems'>
export type ShoppingCarts = ShoppingCart[]