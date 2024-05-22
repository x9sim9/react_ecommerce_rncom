import ShoppingCartPage from '@pages/storefront/shopping_cart_page'
import { toNumber } from '@support/helpers'

/**
 * expect shopping cart totals match the products in cart
 */
export const itHasValidTotals = () => {
	it('has valid subtotal', () => {
		ShoppingCartPage.lineItemsTotal((lintItemsTotal) => {
			ShoppingCartPage.elements.subtotal()
					.sanitiseFixed()
					.shouldNumericallyEq(ShoppingCartPage.elements.tax(), { transformTarget: [['*', '-1'], ['+', lintItemsTotal], ['toFixed', 2]] })
		})
	})

	it('has correct tax', () => {
		ShoppingCartPage.elements.subtotal()
				.invoke('text')
				.then((subtotal) => {
					ShoppingCartPage.elements.tax()
							.shouldNumericallyEq(ShoppingCartPage.elements.total(), {
								transformTarget: [['-', toNumber(subtotal)], ['toFixed', 2]],
							})
				})
	})

	it('has valid total', () => {
		ShoppingCartPage.lineItemsTotal((lintItemsTotal) => {
			ShoppingCartPage.elements.total()
					.sanitiseFixed()
					.should('contain', lintItemsTotal)
		})
	})

	it('header total matches cart total', () => {
		ShoppingCartPage.elements.headerCartTotal()
				.shouldNumericallyEq(ShoppingCartPage.elements.total())
	})
}