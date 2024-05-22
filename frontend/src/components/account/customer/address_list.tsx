'use client'

import { gql } from '@apollo/client'
import { FC } from 'react'

import { AddressProps, AddressResult } from '@/graphql/queries/addresses'
import { useTranslation } from '@/helpers/translation'

import { useAddress } from '@/components/account/customer/use_address'
import { ListRecords, type ListRecordsProps } from '@/components/crud/list_records'

export type AddressListProps = Pick<ListRecordsProps<AddressResult, AddressProps>, 'disableCreate' | 'icon' | 'title'>

/**
 * addresses
 * @param props AddressList props
 * @param props.disableCreate disable create button
 * @param props.icon the @heroicon to use
 * @param props.title the address list title
 * @returns the addresses
 */
export const AddressList: FC<AddressListProps> = ({ disableCreate, icon, title }) => {
	const t = useTranslation({ component: 'account.customer.addressList' })

	const { deleteAddress } = useAddress()
	return (
		<ListRecords<AddressResult, AddressProps> basePath="/account/addresses" changeLabel={t('changeLabel')} combineKeys={{ address: ['line1', 'line2', 'city', 'postcode'] }}
			createLabel={t('createLabel')} data-testid="account.customer.addressList"
			deleteLabel={t('deleteLabel')} disableCreate={disableCreate} icon={icon || 'DocumentTextIcon'}
			messageDeleteFailed={t('deleteFailed')} messageDeleteSuccess={t('deleteSuccess')}
			name="addresses" omitKeys={['id']} onDelete={({ id }) => deleteAddress({ id: id as string })}
			query={gql` 
								query AddressListQuery {
									addresses {
										...addressAll
									}
								}`}
			suspense={{ layout: [10, 1, 1] }}
			title={title || t('title')}
		/>
	)
}

export default AddressList