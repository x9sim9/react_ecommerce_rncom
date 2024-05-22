import { addressesFragments } from '@/graphql/queries/addresses'
import { categoryFragments } from '@/graphql/queries/categories'
import { orderFragments } from '@/graphql/queries/orders'
import { productFragments } from '@/graphql/queries/products'
import { sessionFragments } from '@/graphql/queries/session'
import { shippingFragments } from '@/graphql/queries/shippings'

/** All GraphQL fragments used by Apollo Client queries and mutations */
export const fragments = [
	addressesFragments,
	categoryFragments,
	orderFragments,
	productFragments,
	shippingFragments,
	sessionFragments,
]

export default fragments