'use client'

import { BanknotesIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { map, setWith, size, sortBy, times, toPlainObject, transform } from 'lodash'
import { FC } from 'react'

import { LineItem, Product } from '@/graphql/types'
import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'
import { useRouter } from '@/navigation'

import NotReady from '@/components/common/not_ready'
import ProductImage from '@/components/storefront/product/product_image'

import { Currency, Form, Grid, GridSpan, Heading, Link, Loading, Panel, Slug, Table } from '@/components/ui'

import { useCart } from './use_cart'

export type LargeCartProps = Empty

/**
 * large shopping cart
 * @returns the shopping cart
 */
export const LargeCart: FC<LargeCartProps> = () => {
	const t = useTranslation({ component: 'storefront.shoppingCart.largeCart' })

	const { cart, isReady, updateQuantity } = useCart()
	const { push } = useRouter()

	type CartFormValue = {
		quantity: {
			[key: Product['id']]: LineItem['quantity']
		}
		submitFrom?: {
			remove?: {
				[key: Product['id']]: boolean
			}
		}
	}

	const submit: Form.OnSubmit<CartFormValue> = async (values, _) => {
		push('/shopping_cart/checkout')
		return <NotReady />
	}

	if (!isReady) {
		return <Loading className="h-20 w-full" layout={[8, 4]} type="block"/>
	}

	const cartInitialValues = transform(cart.lineItems,
			(newCart: CartFormValue, value, key) => {
				setWith(newCart, ['quantity', value.product.id.toString()], value.quantity, Object)
			})

	return (
		<Form.Form<CartFormValue> initialValues={cartInitialValues}
			onSubmit={submit}>
			{({ submitForm }) => (
				<Grid gap="large">

					<Grid size={12} verticalAlign="top">
						<GridSpan size={{ default: 12, lg: 8 }}>
							<Panel.Panel>
								<Panel.Head icon={ShoppingCartIcon}>
									{t('title')}
								</Panel.Head>
								<Panel.Body>
									<Grid data-testid="storefront.shoppingCart.largeCart.lineItems">
										{cart?.lineItems && size(cart.lineItems) > 0
											? (
													map(sortBy(cart.lineItems, ['lastUpdatedAt']), (lineItem, index) => (
														<Grid className="group grid-cols-[100px_auto] md:grid-cols-[100px_auto]" data-test-key={lineItem.id} data-test-position={index}
															data-testid="storefront.shoppingCart.largeCart.lineItem"
															gap={{ default: 'medium', xl: 'large', '2xl': 'large' }}
															key={lineItem.id} verticalAlign={{ default: 'top', md: 'middle' }}>
															<Slug categoryId={lineItem.product.category.id} categoryName={lineItem.product.category.name} data-testid="storefront.shoppingCart.largeCart.productLink"
																id={lineItem.product.id}
																name={lineItem.product.name} type="product">
																{lineItem.product.image
																	? <ProductImage className="rounded-lg shadow-sm shadow-gray-500 group-hover:opacity-75 group-hover:transition-none" image={lineItem.product.image}
																			product={lineItem.product}
																			size="thumbnail"/>
																	: null}
															</Slug>
															<Grid className="h-full grid-cols-12 md:grid-cols-[auto_300px] xl:md:grid-cols-[auto_340px]" gap={{ default: 'xs', md: 'medium' }}>
																<GridSpan size={{ default: 12, md: 'auto' }} verticalAlign={{ default: 'top', md: 'none' }}>
																	<Slug categoryId={lineItem.product.category.id} categoryName={lineItem.product.category.name} className="font-semibold" color="black"
																		data-testid="storefront.shoppingCart.largeCart.productName"
																		id={lineItem.product.id} name={lineItem.product.name}
																		size={{ default: 'small', md: 'medium', xl: 'large' }}
																		type="product"
																	>
																		{lineItem.product.name}
																	</Slug>
																</GridSpan>
																<GridSpan size={{ default: 'auto', sm: 0 }}/>
																<GridSpan size={{ default: 12, md: 1 }}>
																	<Grid className="h-fit" size={{ default: 3, md: 4 }}>
																		<GridSpan align={{ default: 'start', md: 'end' }}>
																			<Currency data-testid="storefront.shoppingCart.largeCart.productPrice" tax={true} value={lineItem.product.price}/>
																		</GridSpan>

																		<GridSpan align={{ default: 'end', md: 'end' }} data-testid="storefront.shoppingCart.largeCart.quantity">
																			<Form.Select className="w-20" hideValidation={true} name={`quantity.${lineItem.product.id}`}
																				onChange={(quantity) => {
																					updateQuantity({ productId: lineItem.product.id as Product['id'], quantity: +(quantity as string) })
																				}}
																				options={toPlainObject(times(31))}/>
																		</GridSpan>

																		<GridSpan align="end" size={{ default: 0, md: 1 }}>
																			<Currency data-testid="storefront.shoppingCart.largeCart.productSubtotal" tax={true} value={lineItem.product.price * lineItem.quantity}/>
																		</GridSpan>

																		<GridSpan align="end">
																			<Form.Button color="secondary" data-testid="storefront.shoppingCart.largeCart.deleteProductButton" onClick={() => {
																				updateQuantity({ productId: lineItem.product.id as Product['id'], quantity: 0 })
																			}} size="xsSquare" width="full">
																				<XMarkIcon height={20}/>
																			</Form.Button>
																		</GridSpan>
																	</Grid>
																</GridSpan>
															</Grid>
														</Grid>
													))
												)
											: (
													<Grid align="center" className="p-5" gap="large">
														<Heading data-testid="storefront.shoppingCart.largeCart.cartIsEmpty">{t('emptyShoppingCart')}</Heading>

														<Link color="secondaryOutline" href="/categories" size="large" type="button">{t('browseProducts')}</Link>
													</Grid>
												)}
									</Grid>
								</Panel.Body>
							</Panel.Panel>
						</GridSpan>
						<GridSpan className="sticky top-5" size={{ default: 12, lg: 4 }}>
							<Grid align="center">
								<Panel.Panel className="w-full">
									<Panel.Head icon={BanknotesIcon}>
										{t('total')}
									</Panel.Head>
									<Panel.Body gap="none">
										<Grid align="center">
											<Table.Table border="inner" className="w-full">
												<Table.Body>
													<Table.Row>
														<Table.H>{t('subtotal')}</Table.H>
														<Table.D align="end"><Currency data-testid="storefront.shoppingCart.largeCart.subtotal" value={cart.total}/></Table.D>
													</Table.Row>
													<Table.Row>
														<Table.H>{t('shipping')}</Table.H>
														<Table.D align="end">({t('shippingMessage')})</Table.D>
													</Table.Row>
													<Table.Row>
														<Table.H>{t('tax')}</Table.H>
														<Table.D align="end"><Currency data-testid="storefront.shoppingCart.largeCart.taxTotal" tax={true} taxValue={true} value={cart.total}/></Table.D>
													</Table.Row>
													<Table.Row>
														<Table.H>{t('total')}</Table.H>
														<Table.D align="end"><Currency data-testid="storefront.shoppingCart.largeCart.total" tax={true} value={cart.total}/></Table.D>
													</Table.Row>
												</Table.Body>
											</Table.Table>
										</Grid>
									</Panel.Body>
								</Panel.Panel>
								{cart?.lineItems && size(cart.lineItems) > 0
									? <Form.Submit data-testid="storefront.shoppingCart.largeCart.submitcheckout" name="checkout" size="2xl" width="full">{t('proceedToCheckout')}</Form.Submit>
									: null}
								<Link href="/categories">{t('backToBrowse')}</Link>
							</Grid>
						</GridSpan>
					</Grid>
				</Grid>
			)}
		</Form.Form>
	)
}

export default LargeCart