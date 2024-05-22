import { FC } from 'react'

import { Categories } from '@/graphql/types/category'
import { sanitizeProps } from '@/helpers/component'
import { useTranslation } from '@/helpers/translation'

import { Grid, GridProps, Link, Slug } from '@/components/ui'
import { Body, Head, Panel } from '@/components/ui/panel'

export type CategoriesProps = {
	categories: Categories
} & GridProps

/**
 * all categories
 * @param props CategoriesComponent props
 * @param props.categories the categories
 * @returns the categories
 */
export const CategoriesComponent: FC<CategoriesProps> = ({ categories, ...props }) => {
	const t = useTranslation({ component: 'storefront.product' })

	return (
		<Panel data-testid="storefront.product.categories">
			<Head>
				<Link color="black" data-testid="storefront.product.categories.allCategoriesLink" href="/categories">
					{t('categories.title')}
				</Link>
			</Head>
			<Body>
				<Grid {...sanitizeProps(props)}>
					<Grid gap="small">
						{categories?.map((category, i) => (
							<Slug color="black" id={category.id} key={category.id} name={category.name} type="category">
								{category.name}
							</Slug>
						))}
					</Grid>
				</Grid>
			</Body>
		</Panel>
	)
}

export default CategoriesComponent