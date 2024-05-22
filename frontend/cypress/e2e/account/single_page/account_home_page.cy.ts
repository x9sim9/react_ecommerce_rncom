import { customerSession } from 'cypress/e2e/account/helpers/authenticate'

import { locale } from '@/translations'

import AccountHomePage from '@pages/account/account_home_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'
import { addressSingleLine, crudUpdateUrl } from '@support/helpers/matchers'

describe('AccountHomePage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			customerSession()
			AccountHomePage.visit()
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
				AccountHomePage.elements.recentOrders()
						.should('have.length.at.least', 1)
			})

			describe('each order', () => {
				it('has valid order id', () => {
					AccountHomePage.elements.recentOrdersOrderFriendlyId()
							.shouldBeValidOrderId()
				})

				it('has valid link', () => {
					AccountHomePage.elements.recentOrdersLink()
							.each((link) => {
								expect(link).to.have.attr('href')
							})
				})

				it('has valid date', () => {
					AccountHomePage.elements.recentOrdersDate()
							.shouldBeValidIsoDate()
				})

				it('has quantity', () => {
					AccountHomePage.elements.recentOrdersQuantity()
							.each((quantity) => {
								expect(parseInt(quantity.text())).to.be.greaterThan(0)
							})
				})

				it('has total', () => {
					AccountHomePage.elements.recentOrdersTotal()
							.sanitiseFloat()
							.each((total) => {
								expect(parseFloat(total.text())).to.be.greaterThan(0)
							})
				})
			})

			it('has at least one address', () => {
				AccountHomePage.elements.addresses()
						.should('have.length.at.least', 1)
			})

			describe('each address', () => {
				it('has address', () => {
					AccountHomePage.elements.addressesAddress().each((address) => {
						expect(address.text()).to.match(addressSingleLine)
					})
				})

				it('has valid edit link', () => {
					AccountHomePage.elements.addressesEditLink().each((link) => {
						expect(link.attr('href')).to.match(crudUpdateUrl)
					})
				})
			})
		})
	})
})