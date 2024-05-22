'use client'

import { startCase, toLower } from 'lodash'
import { FC } from 'react'

import { Operation } from '@/graphql/mutations/save_address'
import { Address } from '@/graphql/types/'
import { useTranslation } from '@/helpers/translation'

import useAddress from '@/components/account/customer/use_address'
import { SaveRecord } from '@/components/crud/save_record'

import { Form } from '@/components/ui'

export type SaveAddressProps = {
	id?: Address['id']
	operation: Omit<Lowercase<Operation>, 'delete'>
}

/**
 * save address
 * @param props SaveAddress props
 * @param props.id address id
 * @param props.operation address operation
 * @returns the save address form
 */
export const SaveAddress: FC<SaveAddressProps> = ({ id, operation }) => {
	const t = useTranslation({ component: 'account.customer.saveAddress' })
	const { address, createAddress, errors, updateAddress } = useAddress({ id })

	return (
		<SaveRecord<Address> createButtonLabel={t('submit', { operation: startCase(toLower(operation as string)) })} messageFailed={t('saveFailure')}
			messageSuccess={t('saveSuccess')} onCreate={createAddress}
			onUpdate={updateAddress} operation={operation} record={address}
			recordMap={{
				city: { field: 'text', label: t('city') },
				line1: { field: 'text', label: t('line1') },
				line2: { field: 'text', label: t('line2') },
				postcode: { field: 'text', label: t('postcode') },
			}}
			redirectPath="/account/addresses"
			updateButtonLabel={t('submit', { operation: startCase(toLower(operation as string)) })}
			validationSchema={Form.validation.schema({
				city: { label: t('city'), min: 2, required: true, type: 'text' },
				line1: { label: t('line1'), min: 2, required: true, type: 'text' },
				line2: { label: t('line2'), type: 'text' },
				postcode: { criteria: 'alphanumericExtra', label: t('postcode'), required: true, type: 'text' },
			})}
		/>
	)
}

export default SaveAddress