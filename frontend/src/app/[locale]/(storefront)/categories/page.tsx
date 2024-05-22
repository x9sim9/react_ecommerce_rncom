'use server'

import { gql } from '@apollo/client'
import { type NextPage } from 'next'

import apollo from '@/connections/apollo/rsc'
import { Category, CategoryProps, CategoryResult } from '@/graphql/queries/categories'
import { logger } from '@/helpers/logger'
import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageInfo from '@/components/common/page_info'
import CategoryImage from '@/components/storefront/product/category_image'

import { Grid, Slug } from '@/components/ui'

export type HomeProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * storefront all categories page
 * @param props CategoriesPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const CategoriesPage: NextPage<HomeProps> = async ({ params: { locale } }: HomeProps) => {
	const t = await getTranslation({ app: '/categories', locale })

	const result = await apollo().query<CategoryResult, CategoryProps>({
		query: gql`
			query CategoriesPageQuery {
				categories {
					...categoryBasic
					...categoryThumbnail
				}
			}
		`,
	})
	logger.debug('CategoryPage', { categories: result.data.categories.map((category) => category.id) })
	const categories = result.data.categories

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<Grid data-testid="categoriesPage.categories" gap="xl" size={{ default: 2, sm: 2, md: 3, lg: 3, xl: 4, '2xl': 5 }} verticalAlign="top">
				{categories.map((category) => (
					<Slug align="center" className="group" color="black" data-testid="categoriesPage.category.link" id={category.id} key={category.id} name={category.name} size="2xl" type="category">
						<Grid className="text-center" gap="small" key={category.id}>
							<CategoryImage category={category as Category}
								className="rounded-2xl shadow-sm shadow-gray-700 hover:shadow-lg hover:shadow-inherit group-hover:opacity-75  group-hover:transition-none"
								data-testid="categoriesPage.category.image" size="thumbnail"/>
							<span data-testid="categoriesPage.category.name">{category.name}</span>
						</Grid>
					</Slug>
				))}
			</Grid>
		</>
	)
}

export default CategoriesPage