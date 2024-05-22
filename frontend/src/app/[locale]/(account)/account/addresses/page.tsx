'use server'

import type { NextPage } from 'next'
import { lazy } from 'react'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageContent from '@/components/account/page_content'
import PageInfo from '@/components/common/page_info'

import SuspenseLoading from '@/components/ui/suspense_loading'

const AddressList = lazy(() => import('@/components/account/customer/address_list'))

export type AddressesPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * account all addresses page
 * @param props AddressesPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const AddressesPage: NextPage<AddressesPageProps> = async ({ params: { locale } }: AddressesPageProps) => {
	const t = await getTranslation({ app: '/account/addresses', locale })

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<PageContent>
				<SuspenseLoading layoutClassName="h-[108px]" type="contentBlock">
					<AddressList/>
				</SuspenseLoading>
			</PageContent>
		</>
	)
}

export default AddressesPage