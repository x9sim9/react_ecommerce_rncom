import { gql } from '@apollo/client'

import { LineItem, Order as GraphqlOrder, OrderProduct, QueryOrdersArgs, type QueryOrdersQuery } from '@/graphql/schema/graphql'

export type Order = {
	lineItems: ({
		product: OrderProduct
	} & Omit<LineItem, 'product'>)[]
} & Omit<GraphqlOrder, 'lineItems'>

export type OrderResult = {
	orders: Order[]
} & Omit<QueryOrdersQuery, 'orders'>
export type OrderProps = QueryOrdersArgs
export type Orders = Order[]
export type OrderProducts = OrderProduct[]

export const ordersQuery = gql`
	query QueryOrders($id: ID) {
		orders(id: $id) {
			id
			friendlyId
			customer {
				id
				friendlyId
				firstName
				lastName
				emailAddress
				phoneNumber
			}
			orderAddress {
				id
				line1
				line2
				city
				postcode
			}
			lineItems {
				id
				quantity
				product {
					... on OrderProduct {
						name
						price
						product {
							id
							name
							image {
								imageBlur
								imageThumbnail
							}
							category {
								id
								name
							}
						}
					}
				}
			}
			subtotalAmount
			shippingAmount
			taxAmount
			totalAmount
			createdAt
		}
	}
`

export const orderFragments = gql`
	fragment orderBasic on Order {
		id
		friendlyId
		totalAmount
		createdAt
		lineItems {
			id
		}
	}

	fragment orderDetails on Order {
		id
		friendlyId
		orderAddress {
			id
			line1
			line2
			city
			postcode
		}
		lineItems {
			id
			quantity
			product {
				... on OrderProduct {
					name
					price
					product {
						id
						name
						image {
							imageBlur
							imageThumbnail
						}
						category {
							id
							name
						}
					}
				}
			}
		}
		subtotalAmount
		shippingAmount
		taxAmount
		totalAmount
		createdAt
	}
`