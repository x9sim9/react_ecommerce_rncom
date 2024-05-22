import { customerSession } from 'cypress/e2e/account/helpers/authenticate'

import OrderPage from '@pages/account/order_page'
import OrdersPage from '@pages/account/orders_page'
import { retryableBefore } from '@support/helpers/before'

import JQueryWithSelector = Cypress.JQueryWithSelector

describe('Feature: Orders', () => {
	retryableBefore(() => {
		customerSession()
		OrdersPage.visit()
	})

	it('order id link matches view order link', () => {
		OrdersPage.elements.order()
				.each((order) => {
					OrdersPage.elements.ordersLink(order)
							.then((link) => {
								OrdersPage.elements.ordersIdLink(order)
										.should('have.attr', 'href', link.attr('href'))
							})
				})
	})

	context('>>', { testIsolation: false }, () => {
		it('links to correct order', () => {
			OrdersPage.elements.order()
					.getRandom()
					.then((order) => {
						OrdersPage.elements.ordersOrderFriendlyId(order)
								.asGlobal('orderId')
								.click()

						cy.getGlobal('orderId')
								.then((orderId: JQueryWithSelector) => {
									OrderPage.elements.orderFriendlyId()
											.should('have.html', orderId.text())
								})
					})
		})
	})
})