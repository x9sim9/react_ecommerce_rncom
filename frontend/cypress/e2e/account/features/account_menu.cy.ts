import { customerSession } from 'cypress/e2e/account/helpers/authenticate'

import AccountHomePage from '@pages/account/account_home_page'
import AddressesPage from '@pages/account/addresses_page'
import OrdersPage from '@pages/account/orders_page'
import { removeLocale } from '@support/helpers'
import { retryableBefore } from '@support/helpers/before'

import JQueryWithSelector = Cypress.JQueryWithSelector


describe('Feature: Account Menu', () => {
	retryableBefore(() => {
		customerSession()
		AccountHomePage.visit()
		AccountHomePage.elements.headerAccountMenu()
				.click()
		AccountHomePage.elements.headerAccountMenuAccountHomeLink()
				.asGlobal('headerHomeLink')
		AccountHomePage.elements.headerAccountMenuAccountOrdersLink()
				.asGlobal('headerOrdersLink')
		AccountHomePage.elements.headerAccountMenuAccountAddressesLink()
				.asGlobal('headerAddressesLink')
	})

	it('has menu', () => {
		AccountHomePage.elements.accountMenu()
				.should('exist')
	})

	describe('>>', { testIsolation: false }, () => {
		describe('account menu = header account menu', () => {
			describe('account home', () => {
				it('account home link matches header account home link', () => {
					cy.getGlobal('headerHomeLink').then((link: JQueryWithSelector) => {
						AccountHomePage.elements.headerAccountMenuAccountHomeLink()
								.should('have.attr', 'href', link.attr('href'))
					})
				})

				it('account home label matches header account home label ', () => {
					cy.getGlobal('headerHomeLink').then((link: JQueryWithSelector) => {
						AccountHomePage.elements.headerAccountMenuAccountHomeLink()
								.should('have.html', link.html())
					})
				})
			})

			describe('orders home', () => {
				it('orders home link matches header orders home link', () => {
					cy.getGlobal('headerOrdersLink').then((link: JQueryWithSelector) => {
						AccountHomePage.elements.accountMenuOrdersLink()
								.should('have.attr', 'href', link.attr('href'))
					})
				})

				it('orders home label matches header orders home label ', () => {
					cy.getGlobal('headerOrdersLink')
							.then((link: JQueryWithSelector) => {
								AccountHomePage.elements.accountMenuOrdersLink()
										.should('have.html', link.html())
							})
				})
			})

			describe('addresses home', () => {
				it('addresses home link matches header addresses home link', () => {
					cy.getGlobal('headerAddressesLink').then((link: JQueryWithSelector) => {
						AccountHomePage.elements.accountMenuAddressesLink()
								.should('have.attr', 'href', link.attr('href'))
					})
				})

				it('account home label matches header account home label ', () => {
					AccountHomePage.elements.headerAccountMenuAccountAddressesLink()
					cy.getGlobal('headerAddressesLink').then((link: JQueryWithSelector) => {
						AccountHomePage.elements.accountMenuAddressesLink()
								.should('have.html', link.html())
					})
				})
			})
		})
	})

	describe('menu links', () => {
		describe('account home', () => {
			retryableBefore(() => {
				customerSession()
				cy.getGlobal('headerHomeLink').then((link: JQueryWithSelector) => {
					cy.visit(removeLocale(link.attr('href')))
				})
			})

			it('is account home page', () => {
				AccountHomePage.elements.accountMenuHomeLink()
						.should('have.attr', 'data-active', 'true')
			})
		})

		describe('orders home', () => {
			retryableBefore(() => {
				customerSession()
				cy.getGlobal('headerOrdersLink').then((link: JQueryWithSelector) => {
					cy.visit(removeLocale(link.attr('href')))
				})
			})

			it('is orders page', () => {
				OrdersPage.elements.accountMenuOrdersLink()
						.should('have.attr', 'data-active', 'true')
			})
		})

		describe('addresses home', () => {
			retryableBefore(() => {
				customerSession()
				cy.getGlobal('headerAddressesLink').then((link: JQueryWithSelector) => {
					cy.visit(removeLocale(link.attr('href')))
				})
			})

			it('is addresses page', () => {
				AddressesPage.elements.accountMenuAddressesLink()
						.should('have.attr', 'data-active', 'true')
			})
		})
	})
})