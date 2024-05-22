'use client'

import { gql } from '@apollo/client'
import { notFound } from 'next/navigation'

import apollo, { ApolloQueryResult, FetchResult } from '@/connections/apollo/client'
import { useSuspenseQuery } from '@/connections/apollo/ssr'
import {
	Operation, type SaveAddressCreateProps, type SaveAddressDeleteProps, saveAddressMutation, type SaveAddressProps,
	type SaveAddressResult, type SaveAddressResultItem, type SaveAddressUpdateProps,
} from '@/graphql/mutations/save_address'
import { Address, AddressProps, AddressResult } from '@/graphql/queries/addresses'
import { logger } from '@/helpers/logger'
import { type UseErrorErrors, useErrors, type UseErrorsResult } from '@/helpers/mutation_helper/use_errors'

export type UseAddressProps = {
	id?: Address['id']
}

export type UseAddressResult = {
	address?: Address
	createAddress: (params: SaveAddressCreateProps) => Promise<SaveAddressResultItem>
	deleteAddress: (params: SaveAddressDeleteProps) => Promise<SaveAddressResultItem>
	errors: UseErrorErrors[],
	resetErrors: UseErrorsResult<object>['resetErrors']
	updateAddress: (params: SaveAddressUpdateProps) => Promise<SaveAddressResultItem>
}

export type UseAddressResultFn = (props?: UseAddressProps) => UseAddressResult

/**
 * address
 * @param props useAddress props
 * @param props.id the address id
 * @returns address and helper functions
 */
export const useAddress: UseAddressResultFn = (props: undefined | UseAddressProps) => {
	const { errors, parseErrors, resetErrors } = useErrors()
	const { id } = props || {}

	const result = useSuspenseQuery<AddressResult, AddressProps>(gql`
		query UseAddressQuery($id: ID) {
			addresses(id: $id) {
				...addressAll
			}
		}`, { fetchPolicy: 'no-cache', skip: !id, variables: { id } })

	const address = (result.data?.addresses && result.data.addresses[0]) || undefined

	if (result && id && !address) {
		notFound()
	}

	return {
		address,
		createAddress: async (params) => {
			// eslint-disable-next-line sonarjs/no-duplicate-string
			logger.debug('account.customer.useAddress', 'createAddress', { params })

			const result = await apollo.mutate<SaveAddressResult, SaveAddressProps>({
				mutation: saveAddressMutation,
				variables: { operation: Operation.Create, ...params },
			})
			parseErrors<SaveAddressResult>(result as FetchResult<ApolloQueryResult<SaveAddressResult>>)

			const response = result.data?.saveAddress as SaveAddressResultItem
			logger.debug('account.customer.useAddress', 'createAddress', { result: response })
			return response
		},
		deleteAddress: async (params) => {
			logger.debug('account.customer.useAddress', 'deleteAddress', { params })

			const result = await apollo.mutate<SaveAddressResult, SaveAddressProps>({
				mutation: saveAddressMutation,
				variables: { operation: Operation.Delete, ...params },
			})
			parseErrors<SaveAddressResult>(result as FetchResult<ApolloQueryResult<SaveAddressResult>>)

			const response = result.data?.saveAddress as SaveAddressResultItem
			logger.debug('account.customer.useAddress', 'deleteAddress', { result: response })
			return response
		},
		errors,
		resetErrors,
		updateAddress: async (params) => {
			logger.debug('account.customer.useAddress', 'updateAddress', { params })

			const result = await apollo.mutate<SaveAddressResult, SaveAddressProps>({
				mutation: saveAddressMutation,
				variables: { operation: Operation.Update, ...params },
			})
			parseErrors<SaveAddressResult>(result as FetchResult<ApolloQueryResult<SaveAddressResult>>)

			const response = result.data?.saveAddress as SaveAddressResultItem
			logger.debug('account.customer.useAddress', 'updateAddress', { result: response })
			return response
		},
	}
}

export default useAddress