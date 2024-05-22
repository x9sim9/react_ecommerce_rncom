import { loginAsCustomer, LoginAsCustomerProps as HelpersLoginAsCustomerProps } from 'cypress/e2e/storefront/helpers/customer'

import AccountCommon from '@pages/account/account_common'

import { StorefrontCommon } from './storefront_common'

export type LoginAsCustomerProps = Pick<HelpersLoginAsCustomerProps, 'emailAddress' | 'password'> & {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for LoginPage
 */
class LoginPage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,
		emailAddress: this.get('[data-testid="common.customer.login.emailAddress"]'),
		loginButton: this.get('[data-testid="common.customer.loginButton"]'),
		loginFailedFlashMessage: this.get('[data-testid="ui.flash.message"]', (get) => get.filter('[date-test-key="common.customer.login.loginFailed"]')),
		loginSuccessFlashMessage: this.get('[data-testid="ui.flash.message"]', (get) => get.filter('[date-test-key="common.customer.login.loginSuccess"]')),
		password: this.get('[data-testid="common.customer.Login.password"]'),
	}

	/**
	 * login as a customer
	 * @param options loginAsCustomer options
	 * @param options.verify verify the login was successful
	 */
	loginAsCustomer(options?: LoginAsCustomerProps) {
		loginAsCustomer({ verify: false })

		if (options?.verify !== false) {
			AccountCommon.elements.accountMenu()
					.should('exist')
		}
	}

	/**
	 * visit the LoginPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('loginPage').as('targetRoute')

		if (options?.verify !== false) {
			cy.get('[data-testid="common.customer.loginButton"]').should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new LoginPage)