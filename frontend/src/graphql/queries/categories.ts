import { gql } from '@apollo/client'

import { Category, QueryCategoriesArgs, type QueryCategoriesQuery } from '@/graphql/schema/graphql'

export { type Category } from '../schema/graphql'

export type CategoryResult = QueryCategoriesQuery
export type CategoryProps = QueryCategoriesArgs
export type Categories = Category[]

export const categoriesQuery = gql`
	query QueryCategories($id: ID) {
		categories(id: $id) {
			id
			name
			imageBlur
			imageThumbnail
			imageLarge
			products {
				id
				friendlyId
				name
				price
				image {
					imageBlur
					imageThumbnail
				}
			}
		}
	}
`

export const categoryFragments = gql`
	fragment categoryBasic on Category {
		id
		name
	}

	fragment categoryThumbnail on Category {
		imageBlur
		imageThumbnail
	}
`