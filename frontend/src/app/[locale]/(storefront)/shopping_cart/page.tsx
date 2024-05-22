'use server'

import type { NextPage } from 'next'
import { lazy } from 'react'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageInfo from '@/components/common/page_info'

import SuspenseLoading from '@/components/ui/suspense_loading'

const LargeCart = lazy(() => import('@/components/storefront/shopping_cart/large_cart'))

export type ShoppingCartPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * shopping cart page
 * @param props ShoppingCartPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const ShoppingCartPage: NextPage<ShoppingCartPageProps> = async ({ params: { locale } }: ShoppingCartPageProps) => {
	const t = await getTranslation({ app: '/shopping_cart', locale })

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<SuspenseLoading gap="medium" layout={{ default: [12, 12], md: [8, 4] }} layoutClassName="h-60" type="contentBlock">
				<LargeCart/>
			</SuspenseLoading>
		</>
	)
}

export default ShoppingCartPage