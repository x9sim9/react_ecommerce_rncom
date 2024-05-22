import { customerSession } from 'cypress/e2e/account/helpers/authenticate'
import {
	itHasCorrectTotals,
	itHasValidNewUserFields,
	itHasValidOrder,
	itHasValidShippingFields, itIsExistingUserCheckoutPage,
	itIsNewUserCheckoutPage,
	itMatchesShoppingCartTotals,
} from 'cypress/e2e/storefront/shared_tests/checkout'

import CheckoutPage from '@pages/storefront/checkout_page'
import ShoppingCartPage from '@pages/storefront/shopping_cart_page'
import { retryableBefore } from '@support/helpers/before'

describe('Feature: Checkout', () => {
	context('when products in cart', () => {
		context('when new user', () => {
			retryableBefore(() => {
				CheckoutPage.addProductsToCart()
				CheckoutPage.visit()
				CheckoutPage.clickNewUserButton()
			})

			itIsNewUserCheckoutPage()

			describe('>>', { testIsolation: false }, () => {
				itMatchesShoppingCartTotals()
				itHasCorrectTotals()
				itHasValidNewUserFields()
				itHasValidShippingFields()

				describe('place order', () => {
					retryableBefore(() => {
						CheckoutPage.placeOrder({ newUser: true })
					})

					it('shows flash success message', () => {
						CheckoutPage.elements.checkoutSuccessFlashMessage()
								.should('exist')
					})

					itHasValidOrder()
				})
			})
		})

		context('when login during checkout', () => {
			retryableBefore(() => {
				CheckoutPage.addProductsToCart()
				CheckoutPage.visit()
				CheckoutPage.loginAsCustomer()
			})

			itIsExistingUserCheckoutPage()

			describe('>>', { testIsolation: false }, () => {
				itMatchesShoppingCartTotals()
				itHasCorrectTotals()
				itHasValidShippingFields({ hasExistingAddresses: true })

				context('when new address', () => {
					describe('place order', () => {
						retryableBefore(() => {
							CheckoutPage.placeOrder()
						})

						it('shows flash success message', () => {
							CheckoutPage.elements.checkoutSuccessFlashMessage()
									.should('exist')
						})

						itHasValidOrder()
					})
				})
			})

			context('when existing address', () => {
				retryableBefore(() => {
					CheckoutPage.addProductsToCart()
					CheckoutPage.visit()
					CheckoutPage.loginAsCustomer()
					CheckoutPage.placeOrder({ existingAddress: true })
				})

				itIsExistingUserCheckoutPage()

				describe('>>', { testIsolation: false }, () => {
					it('shows flash success message', () => {
						CheckoutPage.elements.checkoutSuccessFlashMessage()
								.should('exist')
					})

					itHasValidOrder({ existingAddress: true })
				})
			})
		})

		context('when already logged in', () => {
			retryableBefore(() => {
				customerSession()
				CheckoutPage.addProductsToCart()
				CheckoutPage.visit()
			})

			itIsExistingUserCheckoutPage()

			describe('>>', { testIsolation: false }, () => {
				itMatchesShoppingCartTotals()
				itHasCorrectTotals()
				itHasValidShippingFields({ hasExistingAddresses: true })

				context('when new address', () => {
					describe('place order', () => {
						retryableBefore(() => {
							CheckoutPage.placeOrder()
						})

						it('shows flash success message', () => {
							CheckoutPage.elements.checkoutSuccessFlashMessage()
									.should('exist')
						})

						itHasValidOrder()
					})
				})
			})

			context('when existing address', () => {
				retryableBefore(() => {
					customerSession()
					CheckoutPage.addProductsToCart()
					CheckoutPage.visit()
					CheckoutPage.placeOrder({ existingAddress: true })
				})

				itIsExistingUserCheckoutPage()

				describe('>>', { testIsolation: false }, () => {
					it('shows flash success message', () => {
						CheckoutPage.elements.checkoutSuccessFlashMessage()
								.should('exist')
					})

					itHasValidOrder({ existingAddress: true })
				})
			})
		})
	})

	context('when no products in cart', () => {
		retryableBefore(() => {
			CheckoutPage.visit({ verify: false })
		})

		it('redirects user to shoppingCartPage', () => {
			ShoppingCartPage.elements.cartIsEmpty()
					.should('exist')
		})
	})
})