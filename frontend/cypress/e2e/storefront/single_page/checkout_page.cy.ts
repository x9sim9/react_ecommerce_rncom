import { itHasLoginFields, itValidatesLoginFields } from 'cypress/e2e/storefront/shared_tests/login'

import { locale } from '@/translations'

import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import CheckoutPage from '@pages/storefront/checkout_page'
import ProductPage from '@pages/storefront/product_page'
import ShoppingCartPage from '@pages/storefront/shopping_cart_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'

import {
	itHasCorrectTotals,
	itHasValidNewUserFields, itHasValidShippingFields, itIsExistingUserCheckoutPage,
	itIsNewUserCheckoutPage,
} from '.././shared_tests/checkout'

describe('CheckoutPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			CategoriesPage.visit()
			CategoriesPage.clickFirstCategory()
			CategoryPage.clickFirstProduct()
			ProductPage.clickAddToCart()

			CheckoutPage.visit()
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

			describe('login', () => {
				itHasLoginFields()

				describe('validation', () => {
					retryableBefore(() => {
						CheckoutPage.elements.loginButton()
								.click()
					})

					itValidatesLoginFields()
				})
			})

			describe('totals', () => {
				retryableBefore(() => {
					CheckoutPage.clickNewUserButton()
				})

				itHasCorrectTotals()
			})
		})
	})

	context('when products in cart', () => {
		context('when new user', () => {
			retryableBefore(() => {
				CategoriesPage.visit()
				CategoriesPage.clickFirstCategory()
				CategoryPage.clickFirstProduct()
				ProductPage.clickAddToCart()
				CheckoutPage.visit()
				CheckoutPage.clickNewUserButton()
			})

			itIsNewUserCheckoutPage()

			describe('>>', { testIsolation: false }, () => {
				itHasValidNewUserFields()

				itHasValidShippingFields()
			})
		})


		context('when existing user', () => {
			retryableBefore(() => {
				CategoriesPage.visit()
				CategoriesPage.clickFirstCategory()
				CategoryPage.clickFirstProduct()
				ProductPage.clickAddToCart()
				CheckoutPage.visit()
				CheckoutPage.loginAsCustomer()
			})

			itIsExistingUserCheckoutPage()

			describe('>>', { testIsolation: false }, () => {
				itHasValidShippingFields({ hasExistingAddresses: true })
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