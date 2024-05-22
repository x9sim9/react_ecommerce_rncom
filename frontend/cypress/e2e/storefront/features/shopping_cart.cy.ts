import { itHasValidTotals } from 'cypress/e2e/storefront/shared_tests/cart'

import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import ShoppingCartPage from '@pages/storefront/shopping_cart_page'
import { retryableBefore } from '@support/helpers/before'

describe('Feature: Shopping Cart', () => {
	context('when 3 items in cart', () => {
		retryableBefore(() => {
			CategoriesPage.visit()
			CategoriesPage.elements.categoryLink()
					.getRandom()
					.click()

			CategoryPage.addProductsToCart()

			ShoppingCartPage.visit()
		})

		it('has products in cart', () => {
			ShoppingCartPage.elements.lineItemProductName()
					.should('have.length.at.least', 1)
		})

		describe('>>', { testIsolation: false }, () => {
			context('when all products in cart', () => {
				it('has correct items in cart', () => {
					ShoppingCartPage.elements.lineItemProductName()
							.should('have.length', 3)
				})

				it('has correct header quantity', () => {
					ShoppingCartPage.elements.headerCartQuantity()
							.should('have.text', 3)
				})

				itHasValidTotals()
			})


			context('when product removed from cart', () => {
				retryableBefore(() => {
					ShoppingCartPage.deleteLineItem({ position: 1 })
				})

				it('has correct items in cart', () => {
					ShoppingCartPage.elements.lineItemProductName()
							.should('have.length', 2)
				})

				it('has correct header quantity', () => {
					ShoppingCartPage.elements.headerCartQuantity()
							.should('have.text', 2)
				})

				itHasValidTotals()
			})

			context('when product quantity increased', () => {
				retryableBefore(() => {
					ShoppingCartPage.elements.lineItemProductQuantitySelect()
							.eq(0)
							.changeSelect({ selectedLabel: '3' })
				})
				itHasValidTotals()
			})

			context('when product quantity is 0', () => {
				retryableBefore(() => {
					ShoppingCartPage.elements.lineItemProductQuantitySelect()
							.eq(0)
							.changeSelect({ selectedLabel: '0', verify: false })
				})

				it('has correct items in cart', () => {
					ShoppingCartPage.elements.lineItemProductName()
							.should('have.length', 1)
				})

				it('has correct header quantity', () => {
					ShoppingCartPage.elements.headerCartQuantity()
							.should('have.text', 1)
				})

				itHasValidTotals()
			})
		})
	})
})