import { locale } from '@/translations'

import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import ProductPage from '@pages/storefront/product_page'
import { shouldHaveBreadcrumbs } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'
import { decimalValue } from '@support/helpers/matchers'

describe('ProductPage', () => {
	describe('page content', () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
		let currentPath, t

		retryableBefore(() => {
			CategoriesPage.visit()
					.then(({ path }: { path: string }) => {
						currentPath = path + CategoriesPage.paths.productPage
						t = locale.app[currentPath]
					})
			CategoriesPage.clickFirstCategory()
			CategoryPage.clickFirstProduct()
		})

		it('has valid breadcrumbs', () => {
			// -4 = category id
			// -3 = category name
			// -2 = product id
			// -1 = product name
			shouldHaveBreadcrumbs(currentPath, { removeBreadcrumb: [-4, -3, -2, -1] })
		})

		describe('>>', { testIsolation: false }, () => {
			describe('images', () => {
				context('when default image is active', () => {
					it('has selected image', () => {
						ProductPage.elements.selectedImage()
								.should('exist')
					})

					it('has active image', () => {
						ProductPage.elements.activeAvailableImage()
								.should('exist')
					})

					it('selected image matches active image', () => {
						ProductPage.elements.selectedImage()
								.should('have.attr', 'data-test-key')
								.then((attr) => {
									ProductPage.elements.activeAvailableImage().should('have.attr', 'data-test-key', attr)
								})
					})
				})

				context('when second image is active', () => {
					retryableBefore(() => {
						ProductPage.clickSecondImage()
					})

					it('has correct selected image', () => {
						ProductPage.elements.selectedImage()
								.should('have.attr', 'data-test-position', 2)
					})

					it('has correct active image', () => {
						ProductPage.elements.activeAvailableImage()
								.should('have.attr', 'data-test-position', 2)
					})

					it('selected image matches active image', () => {
						ProductPage.elements.selectedImage()
								.should('have.attr', 'data-test-key')
								.then((attr) => {
									ProductPage.elements.activeAvailableImage().should('have.attr', 'data-test-key', attr)
								})
					})
				})
			})

			it('has product name', () => {
				ProductPage.elements.name()
						.invoke('text')
						.should('not.be.empty')
			})

			it('has product description', () => {
				ProductPage.elements.description()
						.invoke('text')
						.should('exist')
						.its('length')
						.should('be.greaterThan', 10)
			})

			it('has product price', () => {
				ProductPage.elements.price()
						.invoke('text')
						.should('match', decimalValue)
			})

			it('has add to cart button', () => {
				ProductPage.elements.addToCartButton()
						.should('exist')
			})
		})
	})

	describe('add to cart', () => {
		context('when quantity is default value', () => {
			context('when add to cart button is pressed once', () => {
				retryableBefore(() => {
					ProductPage.visit()
					ProductPage.clickAddToCart()
				})

				it('shows tooltip message', () => {
					ProductPage.elements.tooltipMessage()
							.should('exist')
				})

				describe('>>', { testIsolation: false }, () => {
					it('shows items in cart message', () => {
						ProductPage.elements.itemsInCartMessage()
								.should('exist')
					})

					describe('cart in header', () => {
						it('shows correct quantity', () => {
							ProductPage.elements.headerCartQuantity()
									.should('have.html', '1')
						})


						it('shows correct price', () => {
							ProductPage.elements.price()
									.invoke('text')
									.then((price) => {
										ProductPage.elements.headerCartTotal()
												.should('contain', price)
									})
						})

						it('shows mini cart previews', () => {
							ProductPage.elements.headerCartSummary()
									.should('exist')
						})
					})
				})
			})

			context('when add to cart button is pressed twice', () => {
				retryableBefore(() => {
					ProductPage.visit()
					ProductPage.clickAddToCart()
					ProductPage.visit()
					ProductPage.clickAddToCart()
				})

				it('shows items in cart message', () => {
					ProductPage.elements.itemsInCartMessage()
							.should('exist')
				})

				describe('>>', { testIsolation: false }, () => {
					describe('cart in header', () => {
						it('shows correct quantity', () => {
							ProductPage.elements.headerCartQuantity()
									.should('have.html', '1')
						})


						it('shows correct price', () => {
							ProductPage.elements.headerCartTotal()
									.shouldNumericallyEq(ProductPage.elements.price(), { transformTarget: ['*', 2] })
						})
					})
				})
			})
		})

		context('when quantity is 3', () => {
			retryableBefore(() => {
				ProductPage.visit()
				ProductPage.setQuantity({ quantity: 3 })
				ProductPage.clickAddToCart()
			})

			it('shows items in cart message', () => {
				ProductPage.elements.itemsInCartMessage()
						.should('exist')
			})

			describe('>>', { testIsolation: false }, () => {
				describe('cart in header', () => {
					it('shows correct quantity', () => {
						ProductPage.elements.headerCartQuantity()
								.should('have.html', '1')
					})


					it('shows correct price', () => {
						ProductPage.elements.headerCartTotal()
								.shouldNumericallyEq(ProductPage.elements.price(), { transformTarget: [['*', 3], ['toFixed', 2]] })
					})
				})
			})
		})

		context('when quantity is invalid', () => {
			retryableBefore(() => {
				ProductPage.visit()
				ProductPage.setQuantity({ quantity: 0 })
				ProductPage.clickAddToCart({ verify: false })
			})

			it('shows error message', () => {
				ProductPage.elements.tooltipMessage()
						.should('exist')
						.should('contain', 'Quantity must be a minimum value of 1')
			})

			describe('>>', { testIsolation: false }, () => {
				it('does not add to cart', () => {
					ProductPage.elements.headerCartQuantity()
							.should('have.html', '0')
				})
			})
		})
	})
})