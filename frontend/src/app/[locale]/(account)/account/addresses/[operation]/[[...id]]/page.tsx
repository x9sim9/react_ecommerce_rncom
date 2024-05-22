'use server'

import type { NextPage } from 'next'
import { notFound } from 'next/navigation'
import { lazy, Suspense } from 'react'

import { Address, Operation } from '@/graphql/schema/graphql'
import { getTranslation, type LocaleType } from '@/helpers/translation'

import PageInfo from '@/components/common/page_info'

const SaveAddress = lazy(() => import('@/components/account/customer/save_address'))

import { Grid, Loading } from '@/components/ui'

export type SaveAddressPageProps = {

	params: {
		id?: [Address['id']]
		locale: LocaleType
		operation: Omit<Lowercase<Operation>, 'delete'>
	}
}

/**
 * account save address page
 * @param props SaveAddressPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @param props.params.id the address id
 * @param props.params.operation the operation type
 * @returns page content
 */
const SaveAddressPage: NextPage<SaveAddressPageProps> = async ({ params: { id, locale, operation } }: SaveAddressPageProps) => {
	const t = await getTranslation({ app: '/account/addresses/[operation]/[[,,,orderId]]', locale }) // Note we have to use commas instead of dots here

	if (!['create', 'update'].includes(operation as string)) {
		notFound()
	}

	if (operation === 'update' && !id) {
		notFound()
	}

	// @ts-expect-error translation key lookup fails on key but is correct
	const operationName = t(`operation.${operation}`)

	return (
		<>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle', { operation: operationName })} removeBreadcrumb={-2}
				server={{ locale }} title={t('pageTitle', { operation: operationName })}/>

			<Suspense fallback={<Grid gap="small">
				<Loading className="h-[62px]" type="contentBlock"/>
				<Loading className="h-[62px]" type="contentBlock"/>
				<Loading className="h-[62px]" type="contentBlock"/>
				<Loading className="h-[62px]" type="contentBlock"/>
				<Loading className="h-[38px]" type="block"/>
			</Grid>}>
				<SaveAddress id={(id && id[0]) || undefined} operation={operation}/>
			</Suspense>
		</>
	)
}

export default SaveAddressPage