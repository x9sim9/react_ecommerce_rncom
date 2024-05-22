

import Customer from '@fabricators/customer'
import AccountHomePage from '@pages/account/account_home_page'
import LoginPage from '@pages/storefront/login_page'
import { retryableBefore } from '@support/helpers/before'

describe('Feature: Login Logout', () => {
	describe('login', () => {
		context('when not logged in', () => {
			context('when valid login credentials', () => {
				retryableBefore(() => {
					LoginPage.visit()
					LoginPage.loginAsCustomer()
				})

				it('user is redirected to AccountHomePage', () => {
					AccountHomePage.elements.accountMenu()
							.should('exist')
				})

				describe('>>', { testIsolation: false }, () => {
					it('shows flash success message', () => {
						LoginPage.elements.loginSuccessFlashMessage()
								.should('exist')
					})
				})
			})

			context('when incorrect password', () => {
				retryableBefore(() => {
					LoginPage.visit()
					cy.fixture('customer').then((customer) => {
						LoginPage.elements.emailAddress()
								.type(customer.login.emailAddress)

						LoginPage.elements.password()
								.type(customer.login.emailAddress) // incorrect password

						LoginPage.elements.loginButton()
								.click()
					})
				})

				it('stays on login page', () => {
					LoginPage.elements.emailAddress()
							.should('exist')
				})

				describe('>>', { testIsolation: false }, () => {
					it('shows error message', () => {
						LoginPage.elements.loginButton()
								.closest('form')
								.hasFormValidationError()
					})

					it('shows flash error message', () => {
						LoginPage.elements.loginFailedFlashMessage()
								.should('exist')
					})
				})
			})

			context('when incorrect email address', () => {
				retryableBefore(() => {
					LoginPage.visit()
					cy.fixture('customer').then((customer) => {
						const incorrectEmailAddress = (new Customer).emailAddress
						LoginPage.elements.emailAddress()
								.type(incorrectEmailAddress)

						LoginPage.elements.password()
								.type(customer.login.password)

						LoginPage.elements.loginButton()
								.click()
					})
				})

				it('stays on login page', () => {
					LoginPage.elements.emailAddress()
							.should('exist')
				})

				describe('>>', { testIsolation: false }, () => {
					it('shows error message', () => {
						LoginPage.elements.loginButton()
								.closest('form')
								.hasFormValidationError()
					})

					it('shows flash error message', () => {
						LoginPage.elements.loginFailedFlashMessage()
								.should('exist')
					})
				})
			})
		})

		context('when already logged in', () => {
			retryableBefore(() => {
				LoginPage.visit()
				LoginPage.loginAsCustomer()
				LoginPage.visit({ verify: false })
			})

			it('user is redirected to AccountHomePage', () => {
				AccountHomePage.elements.accountMenu()
						.should('exist')
			})
		})
	})

	describe('logout', () => {
		context('when not logged in', () => {
			retryableBefore(() => {
				LoginPage.visit()
				AccountHomePage.elements.headerAccountMenu()
						.click()
			})

			it('has no logout button', () => {
				AccountHomePage.elements.headerAccountMenuLogoutButton()
						.should('not.exist')
			})
		})

		context('when already logged in', () => {
			retryableBefore(() => {
				LoginPage.visit()
				LoginPage.loginAsCustomer()
				AccountHomePage.logout()
			})

			it('user is logged out', () => {
				AccountHomePage.elements.accountMenu()
						.should('not.exist')
				LoginPage.elements.loginButton()
						.should('exist')
			})
		})
	})
})