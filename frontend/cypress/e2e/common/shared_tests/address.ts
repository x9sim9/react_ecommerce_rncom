import Address from '@fabricators/address'
import { SaveAddressPage } from '@pages/account/save_address_page'
import { CheckoutPage } from '@pages/storefront/checkout_page'

/**
 * expect address fields to exist
 * @param page the current page
 */
export const itHasAddressFields = (page: CheckoutPage | SaveAddressPage) => {
	it('has line1 field', () => {
		page.elements.line1()
				.should('exist')
	})

	it('has line2 field', () => {
		page.elements.line2()
				.should('exist')
	})

	it('has city field', () => {
		page.elements.city()
				.should('exist')
	})

	it('has postcode field', () => {
		page.elements.postcode()
				.should('exist')
	})
}

/**
 * test address field validations
 * @param page the current page
 */
export const itValidatesAddressFields = (page: CheckoutPage | SaveAddressPage) => {
	describe('line1', () => {
		context('when blank', () => {
			it('is not valid', () => {
				page.elements.line1()
						.clear()
						.hasValidationError()
			})
		})

		context('when valid line1', () => {
			it('is valid', () => {
				const address = new Address

				page.elements.line1()
						.clear()
						.type(address.line1)
						.hasNoValidationError()
						.clear()
			})
		})
	})

	describe('line2', () => {
		context('when blank', () => {
			it('is valid', () => {
				page.elements.line2()
						.clear()
						.hasNoValidationError()
			})
		})

		context('when valid line2', () => {
			it('is valid', () => {
				const address = new Address

				page.elements.line2()
						.clear()
						.type(address.line2)
						.hasNoValidationError()
						.clear()
			})
		})
	})

	describe('city', () => {
		context('when blank', () => {
			it('is not valid', () => {
				page.elements.city()
						.clear()
						.hasValidationError()
			})
		})

		context('when valid city', () => {
			it('is valid', () => {
				const address = new Address

				page.elements.city()
						.clear()
						.type(address.city)
						.hasNoValidationError()
						.clear()
			})
		})
	})

	describe('postcode', () => {
		context('when blank', () => {
			it('is not valid', () => {
				page.elements.postcode()
						.clear()
						.hasValidationError()
			})
		})

		context('when valid postcode', () => {
			it('is valid', () => {
				const address = new Address

				page.elements.postcode()
						.clear()
						.type(address.postcode)
						.hasNoValidationError()
						.clear()
			})
		})
	})
}