import { removeLocale } from '@support/helpers'

import ProductPage from './product_page'
import { StorefrontCommon } from './storefront_common'
import JQueryWithSelector = Cypress.JQueryWithSelector

export type ClickFirstProductProps = {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for CategoryPage
 */
class CategoryPage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,
		productImage: this.get('[data-testid="storefront.product.productImage.image"]'),
		productLink: this.get('[data-testid="categoryPage.product.link"]'),
		productName: this.get('[data-testid="categoryPage.product.name"]'),
		productPrice: this.get('[data-testid="categoryPage.product.price"]'),
		products: this.get('[data-testid="categoryPage.products"]'),
	}

	/**
	 * add products to cart
	 * @param props addProductsToCart props
	 * @param props.quantity the number of products to add
	 * @param props.verify verify the products in cart
	 */
	addProductsToCart(props?: { quantity?: number, verify?: boolean }) {
		const quantity = props?.quantity || 3

		this.elements.headerCartQuantity()
				.sanitiseInt()
				.then((currentQuantity: JQueryWithSelector<HTMLElement>) => {
					const previousQuantity = +currentQuantity.html()
					this.elements.productLink()
							.then((links) => {
								links.slice(0, quantity).each((index, link) => {
									cy.visit(removeLocale(Cypress.$(link).attr('href')))

									if (props?.verify !== false) {
										this.elements.headerCartQuantity()
												.should((newQuantity: JQueryWithSelector<HTMLElement>) => {
													expect(+newQuantity.html()).to.eq(previousQuantity + index)
												})
									}

									ProductPage.clickAddToCart()

									if (props?.verify !== false) {
										this.elements.headerCartQuantity()
												.should((newQuantity: JQueryWithSelector<HTMLElement>) => {
													expect(+newQuantity.html()).to.eq(previousQuantity + index + 1)
												})
									}
								})
							})
				})
	}

	/**
	 * click the first product
	 * @param options clickFirstProduct options
	 * @param options.verify verify the visit was successful
	 */
	clickFirstProduct(options?: ClickFirstProductProps) {
		if (options?.verify !== false) {
			this.elements.productName().eq(0).asGlobal('productName')
		}

		this.elements.productLink()
				.eq(0)
				.click()

		if (options?.verify !== false) {
			cy.getGlobal('productName').then((name: JQueryWithSelector) => {
				ProductPage.elements.name()
						.should('contain', name.text())
			})

			this.elements.headerCartTotal()
					.should('exist')
		}
	}

	/**
	 * visit the CategoryPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('categoryPage', { params: { id: '1', name: 'xxx' } }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.productImage().should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new CategoryPage)