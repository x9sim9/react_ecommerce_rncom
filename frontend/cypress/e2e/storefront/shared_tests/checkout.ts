import { itHasAddressFields, itValidatesAddressFields } from 'cypress/e2e/common/shared_tests/address'

import Customer from '@fabricators/customer'
import OrderPage from '@pages/account/order_page'
import CheckoutPage from '@pages/storefront/checkout_page'
import { toNumber } from '@support/helpers'
import { retryableBefore } from '@support/helpers/before'

import JQueryWithSelector = Cypress.JQueryWithSelector


export type ItHasValidOrderProps = {
	existingAddress?: boolean
}

/**
 * expect order to be valid
 * @param options itHasValidOrder options
 * @param options.hasExistingAddresses if existing address selected during checkout
 */
export const itHasValidOrder = (options?: ItHasValidOrderProps) => {
	it('shows the order confirmation', () => {
		OrderPage.elements.orderFriendlyId()
				.should('exist')
	})

	it('shipping total matches checkout shipping total', () => {
		OrderPage.elements.shippingTotal()
				.shouldNumericallyEq(cy.getGlobal('checkoutShippingTotal'), {
					transformTarget: [['*', +Cypress.env('NEXT_PUBLIC_TAX') || 1.2], ['toFixed', 2]],
				})
	})

	it('total matches checkout total', () => {
		OrderPage.elements.orderTotal()
				.shouldNumericallyEq(cy.getGlobal('checkoutTotal'))
	})

	it('line 1 matches checkout line 1', () => {
		if (options?.existingAddress) {
			cy.getGlobal('checkoutAddress')
					.then((checkoutAddress: JQueryWithSelector<HTMLElement>) => {
						const [line1] = checkoutAddress.html().split(',')
						OrderPage.elements.line1()
								.should('contain', line1.trim())
					})
		} else {
			cy.getGlobal('checkoutLine1').then((line1: JQueryWithSelector<HTMLElement>) => {
				OrderPage.elements.line1()
						.should('contain', line1.val())
			})
		}
	})

	it('line 2 matches checkout line 2', () => {
		if (options?.existingAddress) {
			cy.getGlobal('checkoutAddress')
					.then((checkoutAddress: JQueryWithSelector<HTMLElement>) => {
						const [,line2] = checkoutAddress.html().split(',')
						OrderPage.elements.line2()
								.should('contain', line2.trim())
					})
		} else {
			cy.getGlobal('checkoutLine2').then((line2: JQueryWithSelector<HTMLElement>) => {
				OrderPage.elements.line2()
						.should('contain', line2.val())
			})
		}
	})

	it('city matches checkout city', () => {
		if (options?.existingAddress) {
			cy.getGlobal('checkoutAddress')
					.then((checkoutAddress: JQueryWithSelector<HTMLElement>) => {
						const [,,city] = checkoutAddress.html().split(',')
						OrderPage.elements.city()
								.should('contain', city.trim())
					})
		} else {
			cy.getGlobal('checkoutCity').then((city: JQueryWithSelector<HTMLElement>) => {
				OrderPage.elements.city()
						.should('contain', city.val())
			})
		}
	})

	it('postcode matches checkout postcode', () => {
		if (options?.existingAddress) {
			cy.getGlobal('checkoutAddress')
					.then((checkoutAddress: JQueryWithSelector<HTMLElement>) => {
						const [,,,postcode] = checkoutAddress.html().split(',')
						OrderPage.elements.postcode()
								.should('contain', postcode.trim())
					})
		} else {
			cy.getGlobal('checkoutPostcode').then((postcode: JQueryWithSelector<HTMLElement>) => {
				OrderPage.elements.postcode()
						.should('contain', postcode.val())
			})
		}
	})

	describe('line items', () => {
		it('has correct product names', () => {
			OrderPage.elements.lineItem()
					.each((lineItem) => {
						const position = lineItem.attr('data-test-position')
						cy.getGlobal(`lineItemProductName${position}`).then((productName: JQueryWithSelector<HTMLElement>) => {
							OrderPage.elements.lineItemProductName(lineItem)
									.should('contain', productName.html())
						})
					})
		})


		it('has correct product quantities', () => {
			OrderPage.elements.lineItem()
					.each((lineItem) => {
						const position = lineItem.attr('data-test-position')
						cy.getGlobal(`lineItemProductQuantity${position}`).then((productQuantity: JQueryWithSelector<HTMLElement>) => {
							OrderPage.elements.lineItemProductQuantity(lineItem)
									.should('contain', productQuantity.html())
						})
					})
		})

		it('has correct product prices', () => {
			OrderPage.elements.lineItem()
					.each((lineItem) => {
						const position = lineItem.attr('data-test-position')
						cy.getGlobal(`lineItemProductPrice${position}`).then((productPrice: JQueryWithSelector<HTMLElement>) => {
							OrderPage.elements.lineItemProductPrice(lineItem)
									.should('contain', productPrice.html())
						})
					})
		})
	})
}

/**
 * expect checkout page to be correct for new user
 */
export const itIsNewUserCheckoutPage = () => {
	it('is new user checkout page', () => {
		CheckoutPage.elements.firstName()
				.should('exist')
	})
}

/**
 * expect checkout page to be correct for new user
 */
export const itIsExistingUserCheckoutPage = () => {
	it('is existing user checkout page', () => {
		CheckoutPage.elements.firstName()
				.should('not.exist')
	})
}

/**
  expect checkout totals to match shopping cart totals
 */
export const itMatchesShoppingCartTotals = () => {
	it('subtotal matches shopping cart subtotal', () => {
		cy.getGlobal('cartSubtotal')
				.shouldNumericallyEq(CheckoutPage.elements.subtotal())
	})

	it('tax matches shopping cart tax', () => {
		cy.getGlobal('cartTax')
				.shouldNumericallyEq(CheckoutPage.elements.tax())
	})

	it('total matches shopping cart total', () => {
		cy.getGlobal('cartTotal')
				.shouldNumericallyEq(CheckoutPage.elements.total())
	})
}

/**
 * expect checkout totals to be valid
 */
export const itHasCorrectTotals = () => {
	it('has correct subtotal', () => {
		CheckoutPage.elements.subtotal()
				.shouldNumericallyEq(CheckoutPage.elements.headerCartTotal(), {
					transformTarget: [['/', +Cypress.env('NEXT_PUBLIC_TAX') || 1.2], ['toFixed', 2]],
				})
	})


	it('has correct tax', () => {
		CheckoutPage.elements.subtotal()
				.invoke('text')
				.then((subtotal) => {
					CheckoutPage.elements.tax()
							.shouldNumericallyEq(CheckoutPage.elements.headerCartTotal(), {
								transformTarget: [['-', toNumber(subtotal)], ['toFixed', 2]],
							})
				})
	})

	it('has correct total', () => {
		CheckoutPage.elements.total()
				.shouldNumericallyEq(CheckoutPage.elements.headerCartTotal())
	})
}

/**
 * expect new user fields to exist
 */
export const itHasNewUserFields = () => {
	it('has first name field', () => {
		CheckoutPage.elements.firstName()
				.should('exist')
	})

	it('has last name field', () => {
		CheckoutPage.elements.lastName()
				.should('exist')
	})

	it('has email address field', () => {
		CheckoutPage.elements.emailAddress()
				.should('exist')
	})

	it('has phone number field', () => {
		CheckoutPage.elements.phoneNumber()
				.should('exist')
	})

	it('has password field', () => {
		CheckoutPage.elements.password()
				.should('exist')
	})

	it('has confirm password field', () => {
		CheckoutPage.elements.confirmPassword()
				.should('exist')
	})
}

/**
 * test new user field validations
 */
export const itValidatesUserFields = () => {
	describe('first name', () => {
		context('when blank', () => {
			it('is not valid', () => {
				CheckoutPage.elements.firstName()
						.hasValidationError()
			})
		})

		context('when valid first name', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.firstName()
						.clear()
						.type(customer.firstName)
						.hasNoValidationError()
			})
		})
	})

	describe('last name', () => {
		context('when blank', () => {
			it('is not valid', () => {
				CheckoutPage.elements.lastName()
						.hasValidationError()
			})
		})

		context('when valid last name', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.lastName()
						.clear()
						.type(customer.lastName)
						.hasNoValidationError()
			})
		})
	})

	describe('email address', () => {
		context('when blank', () => {
			it('is not valid', () => {
				CheckoutPage.elements.emailAddress()
						.hasValidationError()
			})
		})

		context('when valid email address', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.emailAddress()
						.clear()
						.type(customer.emailAddress)
						.hasNoValidationError()
						.clear()
			})
		})

		context('when invalid email address', () => {
			it('is not valid', () => {
				const customer = new Customer

				CheckoutPage.elements.emailAddress()
						.clear()
						.type(customer.firstName)
						.hasValidationError()
						.clear()
			})
		})
	})

	describe('phone number', () => {
		context('when blank', () => {
			it('is not valid', () => {
				CheckoutPage.elements.phoneNumber()
						.hasValidationError()
			})
		})

		context('when valid phone number', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.phoneNumber()
						.clearPhoneNumber()
						.type(customer.phoneNumber)
						.hasNoValidationError()
						.clearPhoneNumber()
			})
		})

		context('when invalid phone number', () => {
			it('is not valid', () => {
				const customer = new Customer

				CheckoutPage.elements.phoneNumber()
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
				CheckoutPage.elements.password()
						.hasValidationError()
			})
		})
		context('when valid password', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.password()
						.clear()
						.type(customer.password)
						.hasNoValidationError()
						.clear()
			})
		})
	})

	describe('confirm password', () => {
		context('when blank', () => {
			it('is not valid', () => {
				CheckoutPage.elements.confirmPassword()
						.hasValidationError()
			})
		})

		context('when valid password', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.password()
						.clear()
						.type(customer.password)

				CheckoutPage.elements.confirmPassword()
						.clear()
						.type(customer.password)
						.hasNoValidationError()
						.clear()

				CheckoutPage.elements.password()
						.clear()
			})
		})
	})

	describe('password and confirm password', () => {
		context('when passwords match', () => {
			it('is valid', () => {
				const customer = new Customer

				CheckoutPage.elements.password()
						.clear()
						.type(customer.password)

				CheckoutPage.elements.confirmPassword()
						.clear()
						.type(customer.password)

				CheckoutPage.elements.password()
						.hasNoValidationError()

				CheckoutPage.elements.confirmPassword()
						.hasNoValidationError()

				CheckoutPage.elements.password().clear()
				CheckoutPage.elements.confirmPassword().clear()
			})
		})

		context('when passwords dont match', () => {
			it('is not valid', () => {
				const customer1 = new Customer
				const customer2 = new Customer

				CheckoutPage.elements.password()
						.clear()
						.type(customer1.password)

				CheckoutPage.elements.confirmPassword()
						.clear()
						.type(customer2.password)

				CheckoutPage.elements.password()
						.hasNoValidationError()

				CheckoutPage.elements.confirmPassword()
						.hasValidationError()

				CheckoutPage.elements.password().clear()
				CheckoutPage.elements.confirmPassword().clear()
			})
		})
	})
}

export type ItHasShippingFielsProps = {
	hasExistingAddresses?: boolean
}

/**
 * expect shipping fields to exist
 * @param options itHasShippingFields options
 * @param options.hasExistingAddresses if shipping fields have existing addresses
 */
export const itHasShippingFields = (options?: ItHasShippingFielsProps) => {
	it('has shipping option field', () => {
		CheckoutPage.elements.shippingOption()
				.should('exist')
	})

	it(`has existing addresses ${options?.hasExistingAddresses ? 'field' : 'hidden field'}`, () => {
		if (options?.hasExistingAddresses) {
			CheckoutPage.elements.existingAddressOptionSelect()
					.should('exist')
			CheckoutPage.elements.existingAddressOptionHiddenField()
					.should('not.exist')
		} else {
			CheckoutPage.elements.existingAddressOptionHiddenField()
					.should('exist')
			CheckoutPage.elements.existingAddressOptionSelect()
					.should('not.exist')
		}
	})

	itHasAddressFields(CheckoutPage)
}

export type ItValidatesShippingFieldsRequiredProps = {
	hasExistingAddresses?: boolean
}

/**
 * test shipping field validations
 * @param options itValidatesShippingFields options
 * @param options.hasExistingAddresses if shipping fields have existing addresses
 */
export const itValidatesShippingFields = (options?: ItValidatesShippingFieldsRequiredProps) => {
	describe('shipping option', () => {
		context('when no option selected', () => {
			it('is not valid', () => {
				CheckoutPage.elements.shippingOption()
						.hasValidationError()
			})
		})

		context('when option selected', () => {
			it('is valid', () => {
				CheckoutPage.elements.shippingOptionSelect()
						.changeSelect({ selectedLabelContains: 'Express' })

				CheckoutPage.elements.shippingOption()
						.hasNoValidationError()

				CheckoutPage.elements.shippingOptionSelect()
						.clearSelect()
			})
		})
	})


	if (options?.hasExistingAddresses) {
		describe('existing address', () => {
			context('when no option selected', () => {
				it('is valid', () => {
					CheckoutPage.elements.existingAddressOption()
							.hasNoValidationError()
				})
			})

			context('when existing address is selected', () => {
				retryableBefore(() => {
					CheckoutPage.elements.existingAddressOptionSelect()
							.changeSelect({ last: true })
				})

				it('line1 is valid', () => {
					CheckoutPage.elements.line1().then((line1) => {
						CheckoutPage.elements.existingAddressOptionSelect()
								.selectLabelContains(line1.val() as string)
					})
					CheckoutPage.elements.line1()
							.hasNoValidationError()
							.clear()
				})

				it('line2 is valid', () => {
					CheckoutPage.elements.line2().then((line2) => {
						CheckoutPage.elements.existingAddressOptionSelect()
								.selectLabelContains(line2.val() as string)
					})
					CheckoutPage.elements.line2()
							.hasNoValidationError()
							.clear()
				})

				it('city is valid', () => {
					CheckoutPage.elements.city().then((city) => {
						CheckoutPage.elements.existingAddressOptionSelect()
								.selectLabelContains(city.val() as string)
					})
					CheckoutPage.elements.city()
							.hasNoValidationError()
							.clear()
				})

				it('postcode is valid', () => {
					CheckoutPage.elements.postcode().then((postcode) => {
						CheckoutPage.elements.existingAddressOptionSelect()
								.selectLabelContains(postcode.val() as string)
					})
					CheckoutPage.elements.postcode()
							.hasNoValidationError()
							.clear()
				})
			})

			context('when new address is selected', () => {
				retryableBefore(() => {
					CheckoutPage.elements.existingAddressOptionSelect()
							.changeSelect({ selectedLabelContains: 'New Address' })
				})

				it('line1 is not valid', () => {
					CheckoutPage.elements.line1()
							.hasValidationError()
				})

				it('line2 is not valid', () => {
					CheckoutPage.elements.line2()
							.hasNoValidationError()
				})

				it('city is not valid', () => {
					CheckoutPage.elements.city()
							.hasValidationError()
				})

				it('postcode is not valid', () => {
					CheckoutPage.elements.postcode()
							.hasValidationError()
				})
			})
		})
	}

	itValidatesAddressFields(CheckoutPage)
}

/**
 * expect page has valid new user fields
 */
export const itHasValidNewUserFields = () => {
	describe('new user fields', () => {
		itHasNewUserFields()

		describe('validation', () => {
			retryableBefore(() => {
				CheckoutPage.clickSubmitOrder({ verify: false })
			})

			itValidatesUserFields()
		})
	})
}


/**
 * expect page has valid shipping fields
 * @param options itHasShippingFields options
 * @param options.hasExistingAddresses if shipping fields have existing addresses
 */
export const itHasValidShippingFields = (options?: ItHasShippingFielsProps) => {
	describe('shipping fields', () => {
		itHasShippingFields(options)

		describe('validation', () => {
			retryableBefore(() => {
				CheckoutPage.clickSubmitOrder({ ignoreDisabled: true, verify: false })
			})

			itValidatesShippingFields(options)
		})
	})
}