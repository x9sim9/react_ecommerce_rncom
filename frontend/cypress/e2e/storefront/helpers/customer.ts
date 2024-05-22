import AccountCommon from '@pages/account/account_common'
import LoginPage from '@pages/storefront/login_page'

export type LoginAsCustomerProps = {
	emailAddress?: string
	password?: string
	verify?: boolean
}

/**
 * login as a customer
 * @param options loginAsCustomer options
 * @param options.emailAddress the email address to login with
 * @param options.password options the password to login with
 * @param options.verify options verify the login was successful
 */
export const loginAsCustomer = (options?: LoginAsCustomerProps) => {
	cy.fixture('customer').then((customer) => {
		LoginPage.elements.emailAddress()
				.type(options?.emailAddress || customer.login.emailAddress)

		LoginPage.elements.password()
				.type(options?.password || customer.login.password)

		LoginPage.elements.loginButton()
				.click()
	})

	if (options?.verify !== false) {
		AccountCommon.elements.accountMenu()
				.should('exist')
	}
}