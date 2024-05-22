'use server'

import { isEqual } from 'lodash'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'
import slugify from 'slugify'

import apollo, { gql } from '@/connections/apollo/rsc'
import { Category, CategoryProps, CategoryResult } from '@/graphql/queries/categories'
import { Product, ProductImage as ProductImageType } from '@/graphql/types'
import { logger } from '@/helpers/logger'
import { getTranslation, type LocaleType } from '@/helpers/translation'
import { redirect } from '@/navigation'

import PageInfo from '@/components/common/page_info'
import ProductImage from '@/components/storefront/product/product_image'

import { Currency, getSlug, Grid, Slug } from '@/components/ui'

export type CategoryPageProps = {
	params: {
		categoryId: Category['id']
		categorySlug: string
		locale: LocaleType
	},
}

/**
 * storefront category details page with products
 * @param props CategoryPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @param props.params.categoryId the category id
 * @param props.params.categorySlug the slug for the category
 * @returns page content
 */
const CategoryPage: NextPage<CategoryPageProps> = async ({ params: { categoryId, categorySlug, locale } }: CategoryPageProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const t = await getTranslation({ app: '/categories/[categoryId]', locale })

	logger.debug('CategoryPage', { params: { categoryId, categorySlug } })
	const result = await apollo().query<CategoryResult, CategoryProps>({
		query: gql`
			query CategoryPageQuery($id: ID) {
				categories(id: $id) {
					...categoryBasic
					products {
						...productBasic
						...productSmall
						price
					}
				}
			}
		`,
		variables: { id: categoryId },
	})
	logger.debug('CategoryPage', { categories: result.data.categories.map((category) => category.id) })

	if (!(result.data.categories && result.data.categories.length > 0)) {
		notFound()
	}

	const category = result.data.categories[0]

	const newSlug = slugify(category.name, {
		lower: true,
		trim: true,
	})

	if (categorySlug && !isEqual(categorySlug, newSlug)) {
		redirect(getSlug({ id: categoryId, name: newSlug, type: 'category' }))
	}

	return (
		<>
			<PageInfo breadcrumbTitle={category.name} server={{ locale }} title={category.name}/>

			<Grid data-testid="categoryPage.products" gap="large" size={{ default: 2, sm: 2, md: 2, lg: 3, xl: 4, '2xl': 4 }} verticalAlign="top">
				{category.products?.map((product) => (
					<Slug categoryId={category.id} categoryName={category.name} className="group h-full" color="none" data-testid="categoryPage.product.link" id={product.id} key={product.id}
						name={product.name} type="product">
						<Grid className="group h-full overflow-hidden rounded-2xl border border-gray-200 hover:shadow-lg" gap="none">
							<ProductImage className="group-hover:opacity-75 group-hover:transition-none" image={product.image as ProductImageType} product={product as Product}
								size="small"/>
							<Grid align="center" className="p-5" gap="small">
								<div className="text-xl" data-testid="categoryPage.product.name">{product.name}</div>
								<Currency className="text-lg font-normal" data-testid="categoryPage.product.price" tax={true} value={product.price}/>
							</Grid>
						</Grid>
					</Slug>
				))}
			</Grid>
		</>
	)
}

export type GenerateStaticParamsResult = () => Promise<Omit<CategoryPageProps['params'], 'locale'>[]>

/**
 * get all categories
 * @returns all categories
 */
export const generateStaticParams: GenerateStaticParamsResult = async () => {
	const result = await apollo().query<CategoryResult, CategoryProps>({
		query: gql`
			query CategoryPageStaticQuery {
				categories {
					...categoryBasic
				}
			}
		`,
	})

	return result.data.categories.map((category) => ({
		categoryId: category.id,
		categorySlug: slugify(category.name, {
			lower: true,
			trim: true,
		}),
	})) || []
}

export default CategoryPage
