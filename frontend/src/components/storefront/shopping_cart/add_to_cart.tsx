'use client'

import { BanknotesIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import { useState } from 'react'

import { AddToCartResultItem } from '@/graphql/mutations'
import { Product } from '@/graphql/queries/products'
import { sanitizeProps } from '@/helpers/component'
import { toIsoString } from '@/helpers/date'
import { useTranslation } from '@/helpers/translation'

import { ButtonProps, Form, Grid, GridSpan, Link, Paragraph, type TooltipProps } from '@/components/ui'
import { Body, Head, Panel } from '@/components/ui/panel'

import { useCart } from './use_cart'

export type AddToCartProps = {
	product: Product
} & ButtonProps

/**
 * add to cart button
 * @param props AddToCart props
 * @param props.product the product to add to cart
 * @returns add to cart button
 */
const AddToCart: NextPage<AddToCartProps> = ({ product, ...props }: AddToCartProps) => {
	const t = useTranslation({ component: 'storefront.shoppingCart.addToCart' })
	const { addToCart, cart } = useCart()
	const [result, setResult] = useState<AddToCartResultItem>()
	const [currentTooltip, setCurrentTooltip] = useState<TooltipProps>()

	type FormValues = {
		quantity?: number
	}

	const submit = async (values: FormValues) => {
		const result = await addToCart({ productId: product.id, quantity: values.quantity || 1 })
		switch (result?.result) {
			case true:
				setCurrentTooltip({
					className: 'py-3 ',
					color: 'info',
					expiresAfter: 3,
					key: toIsoString(),
					message: 'Product has been added to your cart',
					size: 'large',
				})
				break
			case false:
				setCurrentTooltip({
					color: 'danger', expiresAfter: 5, key: toIsoString(), message: t('errorAddtoCart'),
				})
		}

		setResult(result)
		if (typeof window !== 'undefined') {
			window.setTimeout(() => {
				setResult(undefined)
			}, 3000)
		}
	}

	return (
		<Form.Form<FormValues> initialValues={{
			quantity: '',
		}} onSubmit={submit} validationSchema={Form.validation.schema<FormValues>({
			quantity: { label: 'Quantity', min: 1, type: 'integer' },
		})}>
			<Panel data-testid="storefront.shoppingCart.addToCart">
				<Head icon={BanknotesIcon}>
					{t('purchase')}
				</Head>
				<Body>
					<Grid align="center">
						<Grid gap="small" size="flex">
							<Form.Number boxSize="small" className="aspect-square h-[44px] border-4 border-gray-300 px-0 text-center text-xl font-bold leading-3 text-blue-500 placeholder:text-gray-400"
								data-testid="storefront.shoppingCart.addToCart.quantity" hideValidationIcon={true} name="quantity" placeholder="1" validationMessageAs="tooltip"/>
							<GridSpan className="flex-auto">
								<Form.Submit color={(result && (result.result ? 'success' : 'danger')) || 'primary'} data-testid="storefront.shoppingCart.addToCart.addButton" size="2xl"
									tooltipPosition="top"
									tooltipProps={currentTooltip}
									width="full" {...sanitizeProps(props)}>
									{t('addToCart')}
								</Form.Submit>
							</GridSpan>
						</Grid>
						{cart.lineItems[product.id]
							? (
									<Paragraph align="center" className="font-semibold" size="large">
										<span data-testid="storefront.shoppingCart.addToCart.itemsInCart">{t('quantityInCart', { quantity: cart.lineItems[product.id].quantity })}</span>
												&#160;
										<Link href="/shopping_cart">{t('shoppingCartLink')}</Link>
									</Paragraph>
								)
							: null}
					</Grid>
				</Body>
			</Panel>

		</Form.Form>
	)
}

export default AddToCart
