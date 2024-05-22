'use server'

import { type NextPage } from 'next'

import apollo, { gql } from '@/connections/apollo/rsc'
import { Categories, CategoryProps, CategoryResult } from '@/graphql/queries/categories'
import { logger } from '@/helpers/logger'
import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageInfo from '@/components/common/page_info'
import CategoriesComponent from '@/components/storefront/product/categories'

import { Badge, Grid, GridSpan } from '@/components/ui'
import MarkdownFile from '@/components/ui/markdown/markdown_file'


export type HomePageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * storefront home page
 * @param props HomePage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const HomePage: NextPage<HomePageProps> = async ({ params: { locale } }: HomePageProps) => {
	const t = await getTranslation({ app: '/', locale })

	const result = await apollo().query<CategoryResult, CategoryProps>({
		query: gql`
			query HomePageQuery {
				categories {
					...categoryBasic
				}
			}
		`,
	})
	logger.debug('HomePage', { categories: result.data.categories.map((category) => category.id) })

	const categories = result.data.categories

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<Grid size={12} verticalAlign="top">
				<GridSpan size={{ default: 0, md: 3, lg: 3, xl: 2 }}>
					<CategoriesComponent categories={categories as Categories}/>
				</GridSpan>

				<GridSpan size={{ default: 12, md: 9, lg: 9, xl: 10 }}>
					<Grid>
						<GridSpan align={{ default: 'start', md: 'end' }}>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<Badge color="warning" size="small">@/app/[locale]/(storefront)/README.md</Badge>
						</GridSpan>
						<GridSpan>
							<Grid className="md:mt-[-44px]">
								<MarkdownFile file="@/app/[locale]/(storefront)/README.md" pathPrefix="/--/docs/"/>
							</Grid>
						</GridSpan>
						<GridSpan align={{ default: 'start', md: 'end' }}>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<Badge color="warning" size="small">@/app/[locale]/(storefront)/DOCUMENTATION.md</Badge>
						</GridSpan>
						<GridSpan>
							<Grid className="md:mt-[-44px]">
								<MarkdownFile file="@/app/[locale]/(storefront)/DOCUMENTATION.md" pathPrefix="/--/docs/"/>
							</Grid>
						</GridSpan>
					</Grid>
				</GridSpan>
			</Grid>
		</>
	)
}

export default HomePage