/** User Session */

import { type Session as GraphqlSession } from '@/graphql/schema/graphql'
import type { ShoppingCart } from '@/graphql/types/shopping_cart'

export type Session = {
	shoppingCart: ShoppingCart
} & Omit<GraphqlSession, 'shoppingCart'>

export type Sessions = Session[]