import type { LoginAsCustomerProps } from 'cypress/e2e/storefront/helpers/customer'

import LoginPage from '@pages/storefront/login_page'

/**
 * Customer Login Session
 * @param options customerSession options
 * @param options.emailAddress the email address to login with
 * @param options.password options the password to login with
 */
export const customerSession = (options: Pick<LoginAsCustomerProps, 'emailAddress' | 'password'> = {}) => {
	const login = ({ emailAddress, password }) => {
		LoginPage.visit()
		cy.setCookie('Test', 'Cypress')
		LoginPage.loginAsCustomer({ emailAddress, password })
	}

	if (!(options?.emailAddress && options?.password)) {
		cy.fixture('customer').then((customer) => {
			options.emailAddress = customer.login.emailAddress
			options.password = customer.login.password

			cy.session([options.emailAddress, options.password], () => {
				login({ emailAddress: options.emailAddress, password: options.password })
			})
		})
	} else {
		cy.session([options.emailAddress, options.password], () => {
			login({ emailAddress: options.emailAddress, password: options.password })
		})
	}
}