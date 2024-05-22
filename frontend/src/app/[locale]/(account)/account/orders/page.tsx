'use server'

import { DocumentIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import { lazy } from 'react'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageContent from '@/components/account/page_content'
import PageInfo from '@/components/common/page_info'

import { Body, Head, Panel } from '@/components/ui/panel'
import SuspenseLoading from '@/components/ui/suspense_loading'

const OrderList = lazy(() => import('@/components/account/order/order_list'))

export type OrdersPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * account all orders page
 * @param props OrdersPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const OrdersPage: NextPage<OrdersPageProps> = async ({ params: { locale } }: OrdersPageProps) => {
	const t = await getTranslation({ app: '/account/orders', locale })

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<PageContent>
				<Panel>
					<Head icon={DocumentIcon}>
						{t('allOrders')}
					</Head>
					<Body gap="none">
						<SuspenseLoading layout={[2, 5, 1, 2, 2]} type="panel">
							<OrderList filter="all"/>
						</SuspenseLoading>
					</Body>
				</Panel>
			</PageContent>
		</>
	)
}

export default OrdersPage