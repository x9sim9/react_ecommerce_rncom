import Customer from '@fabricators/customer'
import LoginPage from '@pages/storefront/login_page'

/**
 * expect login fields to exist
 */
export const itHasLoginFields = () => {
	it('has email address field', () => {
		LoginPage.elements.emailAddress()
				.should('exist')
	})

	it('has password field', () => {
		LoginPage.elements.password()
				.should('exist')
	})
}

/**
 * test login field validations
 */
export const itValidatesLoginFields = () => {
	describe('email address', () => {
		context('when blank', () => {
			it('is not valid', () => {
				LoginPage.elements.emailAddress()
						.hasValidationError()
			})
		})

		context('when valid email address', () => {
			it('is valid', () => {
				const customer = new Customer

				LoginPage.elements.emailAddress()
						.clear()
						.type(customer.emailAddress)
						.hasNoValidationError()
						.clear()
			})
		})

		context('when invalid email address', () => {
			it('is not valid', () => {
				const customer = new Customer

				LoginPage.elements.emailAddress()
						.clear()
						.type(customer.firstName)
						.hasValidationError()
						.clear()
			})
		})
	})

	describe('password', () => {
		context('when blank', () => {
			it('is not valid', () => {
				LoginPage.elements.password()
						.hasValidationError()
			})
		})
		context('when valid password', () => {
			it('is valid', () => {
				const customer = new Customer

				LoginPage.elements.password()
						.clear()
						.type(customer.password)
						.hasNoValidationError()
						.clear()
			})
		})
	})
}