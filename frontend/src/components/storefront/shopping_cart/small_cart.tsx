'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { map, size, sortBy } from 'lodash'
import { DetailedHTMLProps, FC, type HTMLAttributes, useMemo, useState } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { now, toIsoString } from '@/helpers/date'
import { isDevelopment } from '@/helpers/environment'
import { logger } from '@/helpers/logger'
import { useTranslation } from '@/helpers/translation'

import ProductImage from '@/components/storefront/product/product_image'

import { Currency, Grid, GridSpan, Heading, Link, Loading, Slug } from '@/components/ui'
import { Body, Foot, Head, Panel } from '@/components/ui/panel'

import { useCart } from './use_cart'

export type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

/**
 * small shopping cart
 * @param props the props for div
 * @returns the small shopping cart
 */
export const SmallCart: FC<HeaderProps> = ({ ...props }) => {
	const t = useTranslation({ component: 'storefront.shoppingCart.smallCart' })

	const { cart, isReady } = useCart()
	const [previousUpdate, setPreviousUpdate] = useState<string>()
	const [isHover, setIsHover] = useState<boolean>()

	useMemo(() => {
		if (isReady) {
			if (previousUpdate && cart.lastUpdatedAt !== previousUpdate) {
				if (typeof window !== 'undefined') {
					window.setTimeout(() => {
						setPreviousUpdate(cart.lastUpdatedAt)
					}, 5000)
				}
			} else {
				setPreviousUpdate(cart.lastUpdatedAt || toIsoString(now()))
			}

			if (isDevelopment && size(cart?.lineItems) > 0) {
				logger.debug('storefront.shoppingCart.smallCart', {
					cart: map(cart.lineItems, (lineItem) => ({ name: lineItem.product.name, price: lineItem.product.price, quantity: lineItem.quantity })),
					total: cart.total,
				})
			}
		}
	}, [cart])

	const isCartUpdate = isReady && cart.lastUpdatedAt && cart.lastUpdatedAt !== previousUpdate

	if (!isReady) {
		return <Loading type="block"/>
	}

	const PREVIEW_ITEMS = 2

	const summaryLineItems = sortBy(cart.lineItems, ['lastUpdatedAt']).slice(PREVIEW_ITEMS * -1)

	return (
		<div className={`${isCartUpdate ? 'bg-green-100' : ''} -m-5 p-5 ${props.className}`} {...sanitizeProps(props, ['className'] as const)}
			onMouseOut={() => setIsHover(false)} onMouseOver={() => setIsHover(true)}>
			<Link href="/shopping_cart">
				<Grid gap="small" size="flex">
					<Heading data-testid="storefront.shoppingCart.smallCart.quantity" size="medium">
						{size(cart?.lineItems) || 0}
					</Heading>

					<ShoppingCartIcon className="text-black" height={32}/>

					<Heading size="medium">
						<Currency data-testid="storefront.shoppingCart.smallCart.total" tax={true} value={cart.total}/>
					</Heading>
				</Grid>
			</Link>

			{(isCartUpdate || isHover) && size(cart.lineItems) > 0
				? (
						<Panel
							className="absolute left-0 z-10 mx-10 w-[calc(100%-5rem)] overflow-hidden rounded-lg shadow-lg shadow-gray-500 ring-1 ring-black/5 sm:left-auto sm:mx-0 sm:w-96 sm:-translate-x-3/4"
							data-testid="storefront.shoppingCart.smallCart.cartSummary">
							<Head>
								{t('title')}
							</Head>
							<Body>
								<Grid gap="small">
									{size(cart.lineItems) > PREVIEW_ITEMS && (
										<p>{t('otherItems', { count: size(cart.lineItems) - PREVIEW_ITEMS })}</p>
									)}
									{map(summaryLineItems, (lineItem, index) => (
										<div className={`-m-2 p-2 ${isCartUpdate && summaryLineItems.slice(-1)[0] === lineItem ? 'bg-green-100' : ''}`} data-test-key={lineItem.id}
											data-test-position={index} data-testid="storefront.shoppingCart.smallCart.cartPreview.lineItem" key={lineItem.id}>
											<Grid className="w-full grid-cols-[50px_auto]" gap="small" size={2}>
												<ProductImage className="rounded-md shadow-gray-500" image={lineItem.product.image || undefined} product={lineItem.product} size="thumbnail"/>
												<Grid gap="xs" size={2}>
													<GridSpan size={2}>
														<Slug categoryId={lineItem.product.category.id} categoryName={lineItem.product.category.name} color="black"
															data-testid="storefront.shoppingCart.smallCart.cartPreview.productName"
															id={lineItem.product.id} name={lineItem.product.name} size="small" type="product"
														>
															{lineItem.product.name}
														</Slug>
													</GridSpan>
													<GridSpan>
														<Currency className="text-sm" data-testid="storefront.shoppingCart.smallCart.cartPreview.productPrice" value={lineItem.product.price}/>
													</GridSpan>
													<GridSpan align="end">
														<Grid gap={1} size="flex" width="fit">
															<ShoppingCartIcon height={16}/>
															<span data-testid="storefront.shoppingCart.smallCart.cartPreview.quantity">{lineItem.quantity}</span>
														</Grid>
													</GridSpan>
												</Grid>
											</Grid>
										</div>
									))}

								</Grid>
							</Body>
							<Foot>
								<Grid align="center" size={2}>
									<GridSpan align="start">
										<Link href="/shopping_cart">{t('shoppingCartLink')}</Link>
									</GridSpan>
									<GridSpan align="end">
										<Link href="/shopping_cart/checkout">{t('checkoutLink')}</Link>
									</GridSpan>
								</Grid>
							</Foot>
						</Panel>
					)
				: null}
		</div>
	)
}
export default SmallCart
