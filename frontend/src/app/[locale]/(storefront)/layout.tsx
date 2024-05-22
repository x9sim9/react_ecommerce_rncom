'use server'

import { ReactNode } from 'react'

import Provider from '@/app/provider'
import apollo, { gql } from '@/connections/apollo/rsc'
import { type Categories, CategoryProps, CategoryResult } from '@/graphql/queries/categories'
import type { LocaleType } from '@/helpers/translation'

import Html from '@/components/common/html'
import { Page } from '@/components/common/page'

/**
 * the layout for all storefront pages
 * @param props StorefrontLayout props
 * @param props.children children
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns the storefront layout content
 */
const StorefrontLayout = async ({
	children,
	params: { locale },
}: {
	children: ReactNode
	params: {
		locale: LocaleType
	}
}) => {
	const result = await apollo().query<CategoryResult, CategoryProps>({
		query: gql`
			query StorefrontLayoutQuery {
				categories {
					...categoryBasic
				}
			}
		`,
	})

	const categories = result.data.categories as Categories

	return (
		<Html locale={locale}>
			<Provider>
				<Page header={{ categories: categories, locale: locale }} locale={locale}>
					{children}
				</Page>
			</Provider>
		</Html>
	)
}

export default StorefrontLayout