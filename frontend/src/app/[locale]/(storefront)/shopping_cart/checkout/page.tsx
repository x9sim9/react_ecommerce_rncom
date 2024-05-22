'use server'

import type { NextPage } from 'next'
import { lazy } from 'react'

import apollo from '@/connections/apollo/rsc'
import { ShippingProps, ShippingResult, Shippings, shippingsQuery } from '@/graphql/queries/shippings'
import { logger } from '@/helpers/logger'
import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageInfo from '@/components/common/page_info'

import SuspenseLoading from '@/components/ui/suspense_loading'

const Checkout = lazy(() => import('@/components/storefront/shopping_cart/checkout'))

export type CheckoutPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * storefront checkout page
 * @param props CheckoutPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const CheckoutPage: NextPage<CheckoutPageProps> = async ({ params: { locale } }: CheckoutPageProps) => {
	const t = await getTranslation({ app: '/shopping_cart/checkout', locale })

	const result = await apollo().query<ShippingResult, ShippingProps>({
		query: shippingsQuery,
	})
	logger.debug('CheckoutPage', { shippings: result.data.shippings?.map((shipping) => shipping.id) })

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<SuspenseLoading gap="medium" layout={{ default: [12, 12], md: [6, 6] }} layoutClassName="h-80" type="contentBlock">
				<Checkout shippings={result.data.shippings as Shippings}/>
			</SuspenseLoading>
		</>
	)
}

export default CheckoutPage