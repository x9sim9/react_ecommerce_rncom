import { sanitizeFloat, sanitizeInt } from '@support/helpers'

import { StorefrontCommon } from './storefront_common'
import JQueryWithSelector = Cypress.JQueryWithSelector

export type ChangeLineItemQuantitySelectProps = {
	optionLabel: string,
	position: number,
	verify?: boolean
}

export type DeleteLineItemProps = {
	position: number,
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for ShoppingCartPage
 */
class ShoppingCartPage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,
		cartIsEmpty: this.get('[data-testid="storefront.shoppingCart.largeCart.cartIsEmpty"]'),
		lineItemDelete: this.get('[data-testid="storefront.shoppingCart.largeCart.deleteProductButton"]'),
		lineItemProductImage: this.get('[data-testid="storefront.product.productImage.image"]'),
		lineItemProductLink: this.get('[data-testid="storefront.shoppingCart.largeCart.productLink"]'),
		lineItemProductName: this.get('[data-testid="storefront.shoppingCart.largeCart.productName"]'),
		lineItemProductPrice: this.get('[data-testid="storefront.shoppingCart.largeCart.productPrice"]'),
		lineItemProductQuantity: this.get('[data-testid="storefront.shoppingCart.largeCart.quantity"]', (get) => get.find('input[type=hidden]')),
		lineItemProductQuantitySelect: this.get('[data-testid="storefront.shoppingCart.largeCart.quantity"]'),
		lineItemProductSubtotal: this.get('[data-testid="storefront.shoppingCart.largeCart.productSubtotal"]'),
		lineItems: this.get('[data-testid="storefront.shoppingCart.largeCart.lineItem"]'),
		subtotal: this.get('[data-testid="storefront.shoppingCart.largeCart.subtotal"]'),
		tax: this.get('[data-testid="storefront.shoppingCart.largeCart.taxTotal"]'),
		total: this.get('[data-testid="storefront.shoppingCart.largeCart.total"]'),
	}

	/**
	 * change the quantity value for the line item select
	 * @param props changeLineItemQuantitySelect props
	 * @param props.optionLabel the quantity value
	 * @param props.position the position of the line item
	 * @param props.verify verify the visit was successful
	 */
	changeLineItemQuantitySelect({ optionLabel, position, verify }: ChangeLineItemQuantitySelectProps): void {
		this.elements.lineItemProductQuantitySelect()
				.eq(position)
				.changeSelect({ selectedLabel: optionLabel, verify: verify })
	}

	/**
	 * delete a line item from the shopping cart
	 * @param props deleteLineItem props
	 * @param props.position the position of the line item
	 * @param props.verify verify the visit was successful
	 */
	deleteLineItem({ position, verify }: DeleteLineItemProps): void {
		if (verify !== false) {
			this.elements.lineItems().eq(position).asGlobal('targetLineItem')
		}

		this.elements.lineItemDelete()
				.eq(position)
				.click()

		if (verify !== false) {
			cy.getGlobal('targetLineItem').then((lineItem: JQueryWithSelector) => {
				this.elements.lineItems()
						.find(`[cy-key="${lineItem.attr('cy-key')}"]`)
						.should('not.exist')
			})
		}
	}

	/**
	 * calculates the total from the line prices and quantities
	 * @param callback returns the total
	 * @param options lineItemsTotal options
	 * @param options.precision the number of decimal places (default 2)
	 */
	lineItemsTotal(callback: (lineItemTotal: string) => void, options?: { precision: number }) {
		this.elements.lineItems()
				.then((lineItems) => {
					let lintItemsTotal = 0
					lineItems.each((_, lineItem) => {
						const price = this.elements.lineItemProductPrice(Cypress.$(lineItem), { skipWrap: true })
						const quantity = this.elements.lineItemProductQuantity(Cypress.$(lineItem), { skipWrap: true })

						lintItemsTotal += sanitizeFloat(price.html()) * sanitizeInt(quantity.val() as string)
					})

					callback(lintItemsTotal.toFixed(options?.precision || 2))
				})
	}

	/**
	 * visit the ShoppingCartPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('shoppingCartPage').as('targetRoute')

		if (options?.verify !== false) {
			cy.get('[data-testid="storefront.shoppingCart.largeCart.submitcheckout"], [data-testid="storefront.shoppingCart.largeCart.cartIsEmpty"]').should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new ShoppingCartPage)