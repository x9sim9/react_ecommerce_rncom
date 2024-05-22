import { customerSession } from 'cypress/e2e/account/helpers/authenticate'

import { locale } from '@/translations'

import OrdersPage from '@pages/account/orders_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'

describe('OrdersPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			customerSession()
			OrdersPage.visit()
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

			it('has at least one order', () => {
				OrdersPage.elements.orders()
						.should('have.length.at.least', 1)
			})

			describe('each order', () => {
				it('has valid order id', () => {
					OrdersPage.elements.ordersOrderFriendlyId()
							.shouldBeValidOrderId()
				})

				it('has valid link', () => {
					OrdersPage.elements.ordersLink()
							.each((link) => {
								expect(link).to.have.attr('href')
							})
				})

				it('has valid date', () => {
					OrdersPage.elements.ordersDate()
							.shouldBeValidIsoDate()
				})

				it('has quantity', () => {
					OrdersPage.elements.ordersQuantity()
							.each((quantity) => {
								expect(parseInt(quantity.text())).to.be.greaterThan(0)
							})
				})

				it('has total', () => {
					OrdersPage.elements.ordersTotal()
							.sanitiseFloat()
							.each((total) => {
								expect(parseFloat(total.text())).to.be.greaterThan(0)
							})
				})
			})
		})
	})
})