import { locale } from '@/translations'

import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import ProductPage from '@pages/storefront/product_page'
import ShoppingCartPage from '@pages/storefront/shopping_cart_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { toNumber } from '@support/helpers'
import { retryableBefore } from '@support/helpers/before'
import { decimalValue, productUrl } from '@support/helpers/matchers'

describe('ShoppingCartPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			CategoriesPage.visit()
			CategoriesPage.clickFirstCategory()
			CategoryPage.clickFirstProduct()
			ProductPage.clickAddToCart()

			ShoppingCartPage.visit()
					.then(({ path }: { path: string }) => {
						currentPath = path
						t = locale.app[currentPath]
					})
		})

		it('has correct page title', () => {
			shouldHavePageTitle(t.pageTitle)
		})

		describe('>>', { testIsolation: false }, () => {
			it('has correct breadcrumbs', () => {
				shouldHaveBreadcrumbs(currentPath)
			})

			context('when product quantity is default', () => {
				describe('shopping cart', () => {
					it('has one product', () => {
						ShoppingCartPage.elements.lineItems()
								.should('have.length', 1)
					})

					describe('first product', () => {
						it('has image', () => {
							ShoppingCartPage.elements.lineItemProductImage()
									.should('have.attr', 'src')
						})

						it('has valid link', () => {
							ShoppingCartPage.elements.lineItemProductLink()
									.should('exist')
									.should('have.attr', 'href')
									.and('match', productUrl) // product url
						})

						it('has title', () => {
							ShoppingCartPage.elements.lineItemProductName()
									.invoke('text')
									.should('not.be.empty')
						})

						it('has price', () => {
							ShoppingCartPage.elements.lineItemProductPrice()
									.invoke('text')
									.should('match', decimalValue)
						})

						it('has correct quantity', () => {
							ShoppingCartPage.elements.lineItemProductQuantity()
									.should('have.value', 1)
						})

						it('has subtotal', () => {
							ShoppingCartPage.elements.lineItemProductSubtotal()
									.invoke('text')
									.should('match', decimalValue)
						})

						it('price matches subtotal', () => {
							ShoppingCartPage.elements.lineItemProductPrice()
									.shouldNumericallyEq(ShoppingCartPage.elements.lineItemProductSubtotal())
						})
					})
				})

				describe('totals', () => {
					it('has correct subtotal', () => {
						ShoppingCartPage.elements.subtotal()
								.shouldNumericallyEq(ShoppingCartPage.elements.lineItemProductPrice(), {
									transformSource: [['*', +Cypress.env('NEXT_PUBLIC_TAX') || 1.2], ['toFixed', 2]],
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

					it('has correct total', () => {
						ShoppingCartPage.elements.total()
								.shouldNumericallyEq(ShoppingCartPage.elements.lineItemProductPrice())
					})
				})
			})

			context('when product quantity is 3', () => {
				retryableBefore(() => {
					ShoppingCartPage.changeLineItemQuantitySelect({ optionLabel: '3', position: 0 })
				})

				describe('shopping cart', () => {
					describe('first product', () => {
						it('has correct quantity', () => {
							ShoppingCartPage.elements.lineItemProductQuantity()
									.should('have.value', 3)
						})

						it('has valid subtotal', () => {
							ShoppingCartPage.elements.lineItemProductSubtotal()
									.shouldNumericallyEq(ShoppingCartPage.elements.lineItemProductPrice(), {
										transformTarget: [['*', 3], ['toFixed', 2]],
									})
						})
					})
				})

				describe('totals', () => {
					it('has correct subtotal', () => {
						ShoppingCartPage.elements.subtotal()
								.shouldNumericallyEq(ShoppingCartPage.elements.lineItemProductPrice(), {
									transformSource: [['*', +Cypress.env('NEXT_PUBLIC_TAX') || 1.2], ['toFixed', 2]],
									transformTarget: [['*', 3], ['toFixed', 2]],
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

					it('has correct total', () => {
						ShoppingCartPage.elements.total()
								.shouldNumericallyEq(ShoppingCartPage.elements.lineItemProductPrice(), {
									transformTarget: [['*', 3], ['toFixed', 2]],
								})
					})
				})
			})
		})
	})


	context('when product removed from cart', { testIsolation: false }, () => {
		retryableBefore(() => {
			CategoriesPage.visit()
			CategoriesPage.clickFirstCategory()
			CategoryPage.clickFirstProduct()
			ProductPage.clickAddToCart()

			ShoppingCartPage.visit()
			ShoppingCartPage.deleteLineItem({ position: 0, verify: false })
		})

		it('shows cart is empty', () => {
			ShoppingCartPage.elements.cartIsEmpty()
					.should('exist')
		})
	})

	context('when cart is empty', () => {
		retryableBefore(() => {
			ShoppingCartPage.visit()
		})

		it('shows cart is empty', () => {
			ShoppingCartPage.elements.cartIsEmpty()
					.should('exist')
		})
	})
})