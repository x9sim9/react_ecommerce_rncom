import { gql } from '@apollo/client'

import { Product, QueryProductsArgs, type QueryProductsQuery } from '@/graphql/schema/graphql'

export { type Product, type ProductOrder, type ProductOrderBy } from '../schema/graphql'

export type ProductResult = QueryProductsQuery
export type ProductProps = QueryProductsArgs
export type Products = Product[]

export const productsQuery = gql`
	query QueryProducts($id: ID, $categoryId: Int, $orderBy: ProductOrderBy, $order: ProductOrder) {
		products(id: $id, categoryId: $categoryId, orderBy: $orderBy, order: $order) {
			id
			friendlyId
			name
			description
			price
			category {
				id
				name
			}
			images {
				id
				imageBlur
				imageThumbnail
				imageSmall
				imageLarge
			}
		}
	}
`

export const productFragments = gql`
	fragment productBasic on Product {
		id
		name
	}

	fragment productThumbnail on Product {
		image {
			imageBlur
			imageThumbnail
		}
	}

	fragment productSmall on Product {
		image {
			imageBlur
			imageSmall
		}
	}

	fragment productLarge on Product {
		image {
			imageBlur
			imageLarge
		}
	}

	fragment productImages on Product {
		images {
			id
			imageBlur
			imageThumbnail
			imageSmall
			imageLarge
		}
	}

	fragment productDetails on Product {
		...productBasic
		...productImages
		friendlyId
		name
		description
		price
	}
`