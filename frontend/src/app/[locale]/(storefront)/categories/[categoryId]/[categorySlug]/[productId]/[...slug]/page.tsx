'use server'

import { gql } from '@apollo/client'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { isEqual } from 'lodash'
import type { NextPage } from 'next'
import { notFound } from 'next/navigation'
import { lazy } from 'react'
import slugify from 'slugify'

import apollo from '@/connections/apollo/rsc'
import { Product, ProductProps, ProductResult } from '@/graphql/queries/products'
import type { Category } from '@/graphql/schema/graphql'
import { logger } from '@/helpers/logger'
import { getTranslation, type LocaleType } from '@/helpers/translation'
import { redirect } from '@/navigation'

import PageInfo from '@/components/common/page_info'
import ProductImages from '@/components/storefront/product/product_images'

import SuspenseLoading from '@/components/ui/suspense_loading'

const AddToCart = lazy(() => import('@/components/storefront/shopping_cart/add_to_cart'))

import { Currency, getSlug, Grid, GridSpan, Heading, Paragraph } from '@/components/ui'
import { Body, Head, Panel } from '@/components/ui/panel'

export type ProductPageProps = {

	params: {
		categoryId: Category['id']
		categorySlug: Category['name']
		locale: LocaleType
		productId: Product['id']
		slug: string[]
	}
}

/**
 * storefront home page
 * @param props ProductPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @param props.params.categoryId the category id
 * @param props.params.categorySlug the category slug
 * @param props.params.productId the product id
 * @param props.params.slug the product id slug
 * @returns page content
 */
const ProductPage: NextPage<ProductPageProps> = async ({ params: { categoryId, categorySlug, locale, productId, slug } }: ProductPageProps) => {
	const t = await getTranslation({ app: '/categories/[categoryId]/[categorySlug]/[productId]/[,,,slug]', locale }) // Note we have to use commas instead of dots here

	logger.debug('ProductPage', { params: { categoryId, categorySlug, productId, slug } })
	const result = await apollo().query<ProductResult, ProductProps>({
		query: gql`
			query ProductPageQuery($id: ID) {
				products(id: $id) {
					...productDetails
					category {
						...categoryBasic
					}
				}
			}`,
		variables: { id: productId },
	})
	logger.debug('ProductPage', { products: result.data.products?.map((product) => product.name) })

	if (!(result.data.products && result.data.products.length > 0)) {
		notFound()
	}

	const product = result.data.products[0] as Product

	// redirect if url has changed or url is not correct
	const newProductSlug = slugify(product.name, { lower: true, trim: true })
	const newCategorySlug = slugify(product.category.name, { lower: true, trim: true })
	if (slug && (!isEqual(slug, [newProductSlug]) || !isEqual(categorySlug, newCategorySlug))) {
		redirect(getSlug({ categoryId: product.category.id, categoryName: newCategorySlug, id: productId, name: newProductSlug, type: 'product' }))
	}

	return (
		<>
			<PageInfo breadcrumbTitle={product.name} hideTitle={true} server={{ locale }}/>

			<Grid size={2}>
				<Heading data-testid="productPage.productName" size="xl">{product.name}</Heading>
				<GridSpan align="end">
					<Heading size="xl"> <Currency data-testid="productPage.productPrice" tax={true} value={product.price}/></Heading>
				</GridSpan>
			</Grid>
			<ProductImages product={product}/>
			<Grid size={12} verticalAlign="top">
				<GridSpan size={{ default: 12, lg: 8 }}>
					<Panel>
						<Head icon={InformationCircleIcon}>
							{t('productDescription')}
						</Head>
						<Body>
							<Paragraph className="whitespace-pre-line" data-testid="productPage.productDescription">{product.description}</Paragraph>
						</Body>
					</Panel>
				</GridSpan>
				<GridSpan className="sticky top-5" size={{ default: 12, lg: 4 }}>
					<SuspenseLoading layoutClassName="h-[108px]" type="contentBlock">
						<AddToCart product={product}/>
					</SuspenseLoading>
				</GridSpan>
			</Grid>
		</>
	)
}

export type GenerateStaticParamsResult = () => Promise<Omit<ProductPageProps['params'], 'locale'>[]>

/**
 * get all products
 * @returns all products
 */
export const generateStaticParams: GenerateStaticParamsResult = async () => {
	const result = await apollo().query<ProductResult, ProductProps>({
		query: gql`
			query ProductPageStaticQuery {
				products {
					...productBasic
					category {
						...categoryBasic
					}
				}
			}
		`,
	})

	return result.data.products?.map((product) => ({
		categoryId: product.category.id,
		categorySlug: product.category.name,
		productId: product.id,
		slug: [
			slugify(product.name, {
				lower: true,
				trim: true,
			}),
		],
	})) || []
}

export default ProductPage
