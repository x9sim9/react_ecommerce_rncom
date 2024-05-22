import { customerSession } from 'cypress/e2e/account/helpers/authenticate'

import { locale } from '@/translations'

import OrderPage from '@pages/account/order_page'
import OrdersPage from '@pages/account/orders_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { sanitizeFloat } from '@support/helpers'
import { retryableBefore } from '@support/helpers/before'
import { decimalValue, productUrl, value } from '@support/helpers/matchers'

describe('OrderPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			customerSession()
			OrdersPage.visit()
					.then(() => {
						t = locale.app['/account/orders/[orderId]']
					})
			OrdersPage.elements.ordersLink()
					.eq(0)
					.then((link) => {
						const basePath = new URL(Cypress.config().baseUrl).pathname

						currentPath = link.attr('href').slice(basePath.length) // remove basepath from link
					})
					.click()
		})

		it('has correct page title', () => {
			OrderPage.elements.orderFriendlyId()
					.then((orderFriendlyId) => {
						shouldHavePageTitle(`${t.titlePrefix}${orderFriendlyId.html().trim()}`)
					})
		})

		describe('>>', { testIsolation: false }, () => {
			it('has correct breadcrumbs', () => {
				OrderPage.elements.orderFriendlyId()
						.then((orderFriendlyId) => {
							shouldHaveBreadcrumbs(currentPath, { title: `${t.titlePrefix}${orderFriendlyId.html().trim()}` })
						})
			})

			it('has valid order date', () => {
				OrderPage.elements.orderDate()
						.shouldBeValidIsoDate()
			})

			it('has valid order id', () => {
				OrderPage.elements.orderFriendlyId()
						.shouldBeValidOrderId()
			})

			it('has valid shipping total', () => {
				OrderPage.elements.shippingTotal()
						.sanitiseFloat()
						.each((total) => {
							expect(parseFloat(total.text())).to.be.greaterThan(0)
						})
			})

			it('has valid order total', () => {
				OrderPage.elements.orderTotal()
						.sanitiseFloat()
						.each((total) => {
							expect(parseFloat(total.text())).to.be.greaterThan(0)
						})
			})

			describe('address', () => {
				it('has line 1', () => {
					OrderPage.elements.line1()
							.invoke('text')
							.should('have.length.at.least', 2)
				})

				it('has line 2', () => {
					OrderPage.elements.line2()
							.invoke('text')
							.should('have.length.at.least', 2)
				})

				it('has city', () => {
					OrderPage.elements.city()
							.invoke('text')
							.should('have.length.at.least', 2)
				})

				it('has postcode', () => {
					OrderPage.elements.postcode()
							.invoke('text')
							.should('have.length.at.least', 2)
				})
			})

			describe('line items', () => {
				it('has image', () => {
					OrderPage.elements.lineItemProductImage().each((item) => {
						expect(item).to.have.attr('src')
					})
				})

				it('has valid link', () => {
					OrderPage.elements.lineItemProductLink().each((item) => {
						expect(item.attr('href')).to.match(productUrl)
					})
				})

				it('has title', () => {
					OrderPage.elements.lineItemProductName().each((item) => {
						expect(item.html()).to.not.be.empty
					})
				})

				it('has valid price', () => {
					OrderPage.elements.lineItemProductPrice().each((item) => {
						expect(sanitizeFloat(item.html())).to.match(value)
					})
				})

				it('has correct quantity', () => {
					OrderPage.elements.lineItemProductQuantity()
							.sanitiseInt()
							.each((item) => {
								expect(parseInt(item.html())).to.be.greaterThan(0)
							})
				})

				it('has subtotal', () => {
					OrderPage.elements.lineItemProductSubtotal()
							.sanitiseFloat()
							.each((item) => {
								expect(parseFloat(item.html())).to.contains(decimalValue)
							})
				})

				it('price with quantity matches subtotal', () => {
					OrderPage.elements.lineItem().each((item) => {
						OrderPage.elements.lineItemProductQuantity(item)
								.sanitiseInt()
								.invoke('text')
								.then(parseInt)
								.then((quantity) => {
									OrderPage.elements.lineItemProductSubtotal(item)
											.shouldNumericallyEq(OrderPage.elements.lineItemProductPrice(item), { transformTarget: [['*', quantity], ['toFixed', 2]] })
								})
					})
				})
			})
		})
	})
})