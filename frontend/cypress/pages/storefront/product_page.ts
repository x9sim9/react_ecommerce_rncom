
import { StorefrontCommon } from './storefront_common'

export type SetQuantityProps = {
	quantity: number
	verify?: boolean
}

export type ClickAddToCartProps = {
	verify?: boolean
}

export type ClickSecondImageProps = {
	verify?: boolean
}

export type VisitProductPageProps = {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for ProductPage
 */
class ProductPage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,
		// eslint-disable-next-line sonarjs/no-duplicate-string
		activeAvailableImage: this.get('[data-testid="storefront.product.productImages.availableImages"]', (get) => get.find('[data-testid="storefront.product.productImage.image"]').filter('[data-selected="true"]')),
		addToCartButton: this.get('[data-testid="storefront.shoppingCart.addToCart.addButton"]'),
		addToCartQuantity: this.get('[data-testid="storefront.shoppingCart.addToCart.quantity"]'),
		availableImages: this.get('[data-testid="storefront.product.productImages.availableImages"]', (get) => get.find('[data-testid="storefront.product.productImage.image"]')),
		description: this.get('[data-testid="productPage.productDescription"]'),
		itemsInCartMessage: this.get('[data-testid="storefront.shoppingCart.addToCart"]', (get) => get.find('[data-testid="storefront.shoppingCart.addToCart.itemsInCart"]')),
		name: this.get('[data-testid="productPage.productName"]'),
		price: this.get('[data-testid="productPage.productPrice"]'),
		selectedImage: this.get('[data-testid="storefront.product.productImages.selectedImage"]', (get) => get.find('[data-testid="storefront.product.productImage.image"]')),
		tooltipMessage: this.get('[data-testid="storefront.shoppingCart.addToCart"]', (get) => get.find('[data-testid="ui.tooltip.message"]')),
	}

	/**
	 * click the add to cart button
	 * @param options clickAddToCart options
	 * @param options.verify verify the click was successful
	 */
	clickAddToCart(options?: ClickAddToCartProps): void {
		this.elements.addToCartButton().click()

		if (options?.verify !== false) {
			this.elements.itemsInCartMessage()
					.should('be.visible')

			this.elements.headerCartSummary()
					.should('be.visible')
		}
	}

	/**
	 * click the second product image
	 * @param options clickSecondImage options
	 * @param options.verify verify the click was successful
	 */
	clickSecondImage(options?: ClickSecondImageProps): void {
		this.elements.availableImages()
				.eq(1)
				.click()

		if (options?.verify !== false) {
			this.elements.availableImages()
					.eq(1)
					.should('have.attr', 'data-selected', 'true')
		}
	}

	/**
	 * set the add to cart quantity
	 * @param props clickSecondImage props
	 * @param props.quantity the quantity to set
	 * @param props.verify verify the click was successful
	 */
	setQuantity({ quantity, verify }: SetQuantityProps): void {
		this.elements.addToCartQuantity()
				.clear()
				.type(quantity.toString())

		if (verify) {
			this.elements.addToCartQuantity()
					.should('have.value', quantity)
		}
	}

	/**
	 * visit the ProductPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('productPage', { params: { categoryId: '1', categoryName: 'xxx', id: '1', name: 'xxx' } }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.description()
					.should('exist')

			this.elements.headerCartTotal()
					.should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new ProductPage)