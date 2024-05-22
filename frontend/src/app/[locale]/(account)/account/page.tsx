'use server'

import { DocumentIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import { lazy } from 'react'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import AddressList from '@/components/account/customer/address_list'
import PageContent from '@/components/account/page_content'
import PageInfo from '@/components/common/page_info'

import { Body, Head, Panel } from '@/components/ui/panel'
import SuspenseLoading from '@/components/ui/suspense_loading'

const OrderList = lazy(() => import('@/components/account/order/order_list'))

export type AccountPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * account home page
 * @param props AccountHomePage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const AccountHomePage: NextPage<AccountPageProps> = async ({ params: { locale } }: AccountPageProps) => {
	const t = await getTranslation({ app: '/account', locale })

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<PageContent>
				<Panel>
					<Head icon={DocumentIcon}>
						{t('recentOrders')}
					</Head>
					<Body gap="none">
						<SuspenseLoading layout={[2, 5, 1, 2, 2]} type="panel">
							<OrderList filter="recent"/>
						</SuspenseLoading>
					</Body>
				</Panel>

				<SuspenseLoading layoutClassName="h-[108px]" type="contentBlock">
					<AddressList disableCreate={true} icon="IdentificationIcon" title={t('addresses')}/>
				</SuspenseLoading>

			</PageContent>
		</>
	)
}

export default AccountHomePage