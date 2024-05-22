'use client'

import { BanknotesIcon, UserIcon } from '@heroicons/react/24/outline'
import { find, keyBy, size, transform } from 'lodash'
import { FC, useEffect, useState } from 'react'

import { useSuspenseQuery } from '@/connections/apollo'
import { CreateOrderProps, CreateOrderResultItem } from '@/graphql/mutations'
import { type Address, type Addresses, addressesQuery, AddressProps, AddressResult } from '@/graphql/queries/addresses'
import type { Shipping, Shippings } from '@/graphql/queries/shippings'
import { logger } from '@/helpers/logger'
import { createObject, useFormat, useTranslation } from '@/helpers/translation'
import { useRouter } from '@/navigation'

import Login from '@/components/common/customer/login'
import NotReady from '@/components/common/not_ready'

import { Button, currency, Currency, Form, Grid, GridSpan, Heading, Paragraph, Table } from '@/components/ui'
import { useFlash } from '@/components/ui/flash'
import { Body, Head, Panel } from '@/components/ui/panel'

import useCheckout from './use_checkout'

export type CheckoutProps = {
	shippings?: { [key: Shipping['id']]: Shipping } | Shippings
}

/**
 * shopping cart checkout
 * @param props Checkout props
 * @param props.shippings the shipping types
 * @returns the checkout
 */
export const Checkout: FC<CheckoutProps> = ({ shippings }) => {
	const t = useTranslation({ component: 'storefront.shoppingCart.checkout' })
	const f = useFormat()
	const { addMessage } = useFlash()
	const { push, replace } = useRouter()

	shippings = keyBy(shippings, 'id') as { [key: Shipping['id']]: Shipping }

	const [newUser, setNewUser] = useState<boolean>(false)
	const { cart, createOrder, customer, errors, isReady } = useCheckout()
	const [orderId, setOrderId] = useState<CreateOrderResultItem['orderId']>()

	const result = useSuspenseQuery<AddressResult, AddressProps>(addressesQuery, { fetchPolicy: 'no-cache', skip: !customer?.id })
	logger.debug('storefront.shoppingCart.checkout', { shippings: result.data?.addresses?.map((address) => address.id) })
	const addresses = result.data?.addresses as Addresses

	type CheckoutValues = CreateOrderProps

	const submit: Form.OnSubmit<CheckoutValues> = async (values, _) => {
		const result = await createOrder(values as CheckoutValues)

		if (result.result) {
			addMessage({ id: 'storefront.shoppingCart.createOrderSuccess', message: t('createOrderSuccess'), redirect: true, type: 'success' })
			setOrderId(result.orderId)
		} else {
			addMessage({ id: 'storefront.shoppingCart.createOrderFailed', message: (result.showError && result.errors?.join('\n')) || t('createOrderFailed'), type: 'danger' })
		}
	}

	useEffect(() => {
		if (isReady && orderId && customer.isAuthenticated) {
			// @ts-expect-error typescript cannot verify dynamic string paths are valid
			replace(`/account/orders/${orderId}`)
		} else if (!(size(cart.lineItems) > 0)) {
			replace('/shopping_cart')
		}
	}, [isReady, orderId, customer.isAuthenticated])

	if (!isReady || (orderId && customer.isAuthenticated) || !(size(cart.lineItems) > 0)) {
		return <NotReady />
	}

	const shippingValue = (shippingId?: Shipping['id']) => shippingId ? shippings[shippingId].price : 0

	return (
		customer.id || newUser
			? (
					<Form.Form<CheckoutValues> initialValues={{
						addressCity: '',
						addressId: 'new',
						addressLine1: '',
						addressLine2: '',
						addressPostcode: '',
						customerConfirmPassword: '',
						customerEmailAddress: '',
						customerFirstName: '',
						customerLastName: '',
						customerPassword: '',
						customerPhoneNumber: '',
						shippingId: '',
					}} onSubmit={submit} validationSchema={Form.validation.schema<CheckoutValues>({
						addressCity: { label: t('address.city'), min: 2, required: true, type: 'text' },
						addressLine1: { label: t('address.line1'), min: 2, required: true, type: 'text' },
						addressLine2: { label: t('address.line2'), type: 'text' },
						addressPostcode: { criteria: 'alphanumericExtra', label: t('address.postcode'), required: true, type: 'text' },
						customerConfirmPassword: { label: t('customer.confirmPassword'), mustMatch: 'customerPassword', required: newUser, type: 'text' },
						customerEmailAddress: { criteria: 'emailAddress', label: t('customer.emailAddress'), required: newUser, type: 'text' },
						customerFirstName: { label: t('customer.firstName'), min: 2, required: newUser, type: 'text' },
						customerLastName: { label: t('customer.lastName'), min: 2, required: newUser, type: 'text' },
						customerPassword: { criteria: process.env.NEXT_PUBLIC_SECuRE_PASSWORD === 'false' ? undefined : 'password', label: t('customer.password'), required: newUser, type: 'text' },
						customerPhoneNumber: { label: t('customer.phoneNumber'), required: newUser, type: 'phoneNumber' },
						shippingId: { label: t('shippingOptions'), required: true, type: 'string' },
					})}>
						{({ setValues, touched, values }) => (
							<Grid className="grid-cols-1 md:grid-cols-[auto_240px]" size={12} verticalAlign="top">
								<GridSpan>
									<Grid>
										{newUser
											? <Panel>
													<Head>{t('details')}</Head>
													<Body>
														<Grid>
															<Form.Text data-testid="storefront.shoppingCart.checkout.firstName" name="customerFirstName">{t('customer.firstName')}</Form.Text>
															<Form.Text data-testid="storefront.shoppingCart.checkout.lastName" name="customerLastName">{t('customer.lastName')}</Form.Text>
															<Form.Text data-testid="storefront.shoppingCart.checkout.emailAddress" name="customerEmailAddress">{t('customer.emailAddress')}</Form.Text>
															<Form.PhoneNumber data-testid="storefront.shoppingCart.checkout.phoneNumber" name="customerPhoneNumber">{t('customer.phoneNumber')}</Form.PhoneNumber>
															<Form.Password data-testid="storefront.shoppingCart.checkout.password" name="customerPassword">{t('customer.password')}</Form.Password>
															<Form.Password data-testid="storefront.shoppingCart.checkout.confirmPassword" name="customerConfirmPassword">{t('customer.confirmPassword')}</Form.Password>
														</Grid>
													</Body>
												</Panel>
											: null}

										<Panel>
											<Head>{t('shippingLabel')}</Head>
											<Body>
												<Grid>
													<span data-testid="storefront.shoppingCart.checkout.shippingId">
														<Form.Select isClearable name="shippingId" options={{
															...transform(shippings, (newShippings, shipping) => {
																newShippings[`${shipping.name} - ${currency(f, { value: shipping.price })} + ${t('tax')} - ${shipping.description}`] = shipping.id
															}),
														}}>{t('shippingOptions')}</Form.Select>
													</span>
													{addresses && addresses?.length > 0
														? (
																<span data-testid="storefront.shoppingCart.checkout.addressId">
																	<Form.Select isClearable name="addressId" onChange={(newValue) => {
																		const addressId: Address['id'][] = newValue as unknown as Address['id'][]
																		const selectedAddress = addressId[0] === 'new' ? undefined : find(addresses, { id: addressId[0] })

																		setValues({
																			...values,
																			addressCity: selectedAddress?.city || '',
																			addressId: addressId[0],
																			addressLine1: selectedAddress?.line1 || '',
																			addressLine2: selectedAddress?.line2 || '',
																			addressPostcode: selectedAddress?.postcode || '',
																		})
																	}} options={{
																		...createObject(`${t('address.newAddress')}...`, 'new'),
																		...transform(keyBy(addresses, 'id'), (newAddresses, address) => {
																			newAddresses[`${address.line1}, ${address.line2}, ${address.city}, ${address.postcode}`] = address.id
																		}),
																	}} placeholder={t('selectAddress')}>
																		{t('existingAddresses')}
																	</Form.Select>
																</span>
															)
														: (
																<input data-testid="storefront.shoppingCart.checkout.addressId" name="addressId" type="hidden" value="new"/>
															)}

													<Form.Text data-testid="storefront.shoppingCart.checkout.line1" name="addressLine1">{t('address.line1')}</Form.Text>
													<Form.Text data-testid="storefront.shoppingCart.checkout.line2" name="addressLine2">{t('address.line2')}</Form.Text>
													<Form.Text data-testid="storefront.shoppingCart.checkout.city" name="addressCity">{t('address.city')}</Form.Text>
													<Form.Text data-testid="storefront.shoppingCart.checkout.postcode" name="addressPostcode">{t('address.postcode')}</Form.Text>
												</Grid>
											</Body>
										</Panel>
									</Grid>
								</GridSpan>
								<GridSpan className="sticky top-5 w-full md:w-[240px]">
									<Grid>
										<Panel>
											<Head icon={BanknotesIcon}>
												{t('totalsLabel')}
											</Head>
											<Body gap="none">
												<Table.Table border="inner" className="w-full">
													<Table.Body>
														<Table.Row>
															<Table.H>{t('subtotal')}</Table.H>
															<Table.D align="end"><Currency data-testid="storefront.shoppingCart.checkout.subtotal" value={cart.total}/></Table.D>
														</Table.Row>
														<Table.Row>
															<Table.H>{t('shipping')}</Table.H>
															<Table.D align="end">
																{values?.shippingId && shippings
																	? (
																			<Currency data-testid="storefront.shoppingCart.checkout.shippingTotal" value={shippingValue(values.shippingId)}/>
																		)
																	: (
																			<>...</>
																		)}
															</Table.D>
														</Table.Row>
														<Table.Row>
															<Table.H>{t('tax')}</Table.H>
															<Table.D align="end"><Currency data-testid="storefront.shoppingCart.checkout.taxTotal" tax={true} taxValue={true}
																value={cart.total + shippingValue(values.shippingId)}/></Table.D>
														</Table.Row>
														<Table.Row>
															<Table.H>{t('total')}</Table.H>
															<Table.D align="end"><Currency data-testid="storefront.shoppingCart.checkout.total" tax={true} value={cart.total + shippingValue(values.shippingId)}/></Table.D>
														</Table.Row>
													</Table.Body>
												</Table.Table>
											</Body>
										</Panel>
										<Form.Submit data-testid="storefront.shoppingCart.checkout.submitOrder" errorMessage={
											touched ? errors.map((error, key) => error.showError ? error.message : t('orderError')) : undefined
										} size="xl" tooltipPosition={{ default: 'right', md: 'top' }} width="full">{t('buyButton')}</Form.Submit>
									</Grid>
								</GridSpan>
							</Grid>
						)}
					</Form.Form>
				)
			: (
					<>
						<Grid align="center" size={2}>
							<Heading>{t('existingCustomer')}</Heading>
							<Heading>{t('newCustomer')}</Heading>
						</Grid>
						<Grid size={2} verticalAlign="top">
							<Login className="w-full"/>
							<Panel className="size-full">
								<Head icon={UserIcon}>
									{t('newCustomer')}
								</Head>
								<Body className="h-full">
									<Grid align="center" gap="xl" size="row" verticalAlign="none">
										<GridSpan align="center" size="fullRow" verticalAlign="middle">
											<Paragraph align="center" size="large" weight="normal">{t('newCustomerParagraph')}</Paragraph>
										</GridSpan>
										<GridSpan verticalAlign="bottom">
											<Button data-testid="storefront.shoppingCart.checkout.newUserButton" onClick={() => setNewUser(true)} size="xl" width="full">{t('createNewAccount')}</Button>
										</GridSpan>
									</Grid>
								</Body>
							</Panel>
						</Grid>
					</>
				)
	)
}

export default Checkout