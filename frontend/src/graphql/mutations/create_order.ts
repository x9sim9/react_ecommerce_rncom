import { gql } from '@apollo/client'

import { type CreateOrderMutationInput, type CreateOrderMutationPayload, MutationCreateOrderMutation } from '@/graphql/schema/graphql'

export type CreateOrderResultItem = CreateOrderMutationPayload
export type CreateOrderResult = MutationCreateOrderMutation
export type CreateOrderProps = CreateOrderMutationInput

export const createOrderMutation = gql`
	mutation MutationCreateOrder(
		$customerFirstName: String,
		$customerLastName: String,
		$customerEmailAddress: String,
		$customerPhoneNumber: String,
		$customerPassword: String,
		$customerConfirmPassword: String,
		$addressId: ID,
		$addressLine1: String,
		$addressLine2: String,
		$addressCity: String,
		$addressPostcode: String,
		$shippingId: ID!,
	) {
		createOrder(input: {
			customerFirstName: $customerFirstName,
			customerLastName: $customerLastName,
			customerEmailAddress: $customerEmailAddress,
			customerPhoneNumber: $customerPhoneNumber,
			customerPassword: $customerPassword,
			customerConfirmPassword: $customerConfirmPassword,
			addressId: $addressId,
			addressLine1: $addressLine1,
			addressLine2: $addressLine2,
			addressCity: $addressCity,
			addressPostcode: $addressPostcode,
			shippingId: $shippingId,
		}) {
			result
			errors
			showError
			orderId
			customer {
				...sessionCustomer
			}
		}
	}
`