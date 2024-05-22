import { customerSession } from 'cypress/e2e/account/helpers/authenticate'
import { describe } from 'mocha'

import Address from '@fabricators/address'
import AddressesPage from '@pages/account/addresses_page'
import SaveAddressPage from '@pages/account/save_address_page'
import { retryableBefore } from '@support/helpers/before'

import JQueryWithSelector = Cypress.JQueryWithSelector

describe('Feature: Addresses', () => {
	describe('create', () => {
		const address = (new Address)

		retryableBefore(() => {
			customerSession()
			AddressesPage.visit()
			AddressesPage.elements.addressesAddLink()
					.click()

			SaveAddressPage.elements.line1()
					.clear()
					.type(address.line1)
			SaveAddressPage.elements.line2()
					.clear()
					.type(address.line2)
			SaveAddressPage.elements.city()
					.clear()
					.type(address.city)
			SaveAddressPage.elements.postcode()
					.clear()
					.type(address.postcode)
			SaveAddressPage.elements.saveButton()
					.click()
		})

		it('shows flash success message', () => {
			AddressesPage.elements.saveSuccessFlashMessage()
					.should('exist')
		})

		describe('>>', { testIsolation: false }, () => {
			it('line1 has correct value', () => {
				AddressesPage.elements.address()
						.first()
						.then((targetAddress: JQueryWithSelector<HTMLElement>) => {
							AddressesPage.elements.addressesAddress(targetAddress)
									.should((subjectAddress) => {
										const [line1] = subjectAddress.html().split(',')
										expect(line1.trim()).to.eq(address.line1)
									})
						})
			})

			it('line2 has correct value', () => {
				AddressesPage.elements.address()
						.first()
						.then((targetAddress: JQueryWithSelector<HTMLElement>) => {
							AddressesPage.elements.addressesAddress(targetAddress)
									.should((subjectAddress) => {
										const [,line2] = subjectAddress.html().split(',')
										expect(line2.trim()).to.eq(address.line2)
									})
						})
			})

			it('city has correct value', () => {
				AddressesPage.elements.address()
						.first()
						.then((targetAddress: JQueryWithSelector<HTMLElement>) => {
							AddressesPage.elements.addressesAddress(targetAddress)
									.should((subjectAddress) => {
										const [,,city] = subjectAddress.html().split(',')
										expect(city.trim()).to.eq(address.city)
									})
						})
			})

			it('postcode has correct value', () => {
				AddressesPage.elements.address()
						.first()
						.then((targetAddress: JQueryWithSelector<HTMLElement>) => {
							AddressesPage.elements.addressesAddress(targetAddress)
									.should((subjectAddress) => {
										const [,,,postcode] = subjectAddress.html().split(',')
										expect(postcode.trim()).to.eq(address.postcode)
									})
						})
			})
		})
	})

	describe('update address', () => {
		retryableBefore(() => {
			customerSession()
			AddressesPage.visit()
			AddressesPage.elements.address()
					.getRandom()
					.asGlobal('targetAddress')
					.then((address: JQueryWithSelector<HTMLElement>) => {
						AddressesPage.elements.addressesAddress(address)
								.asGlobal('subjectAddress')

						AddressesPage.elements.addressesEditLink(address)
								.click()
					})
		})

		it('shows correct address', () => {
			cy.getGlobal('subjectAddress')
					.then((subjectAddress: JQueryWithSelector<HTMLElement>) => {
						const [line1, line2, city, postcode] = subjectAddress.html().split(',')
						SaveAddressPage.elements.line1()
								.should('have.value', line1.trim())
						SaveAddressPage.elements.line2()
								.should('have.value', line2.trim())
						SaveAddressPage.elements.city()
								.should('have.value', city.trim())
						SaveAddressPage.elements.postcode()
								.should('have.value', postcode.trim())
					})
		})

		describe('>>', { testIsolation: false }, () => {
			context('when address is updated', () => {
				const address = (new Address)

				retryableBefore(() => {
					SaveAddressPage.elements.line1()
							.clear()
							.type(address.line1)
					SaveAddressPage.elements.line2()
							.clear()
							.type(address.line2)
					SaveAddressPage.elements.city()
							.clear()
							.type(address.city)
					SaveAddressPage.elements.postcode()
							.clear()
							.type(address.postcode)
					SaveAddressPage.elements.saveButton()
							.click()
				})

				describe('>>', { testIsolation: false }, () => {
					it('shows flash success message', () => {
						AddressesPage.elements.saveSuccessFlashMessage()
								.should('exist')
					})
				})

				it('line1 has correct value', () => {
					cy.getGlobal('targetAddress')
							.then((subjectAddress: JQueryWithSelector<HTMLElement>) => {
								const addressId = subjectAddress.attr('data-test-key')
								AddressesPage.elements.address()
										.filter(`[data-test-key="${addressId}"]`)
										.then((targetAddress) => {
											AddressesPage.elements.addressesAddress(targetAddress)
													.should((targetAddress) => {
														const [line1] = targetAddress.html().split(',')

														expect(line1.trim()).to.eq(address.line1)
													})
										})
							})
				})

				it('line2 has correct value', () => {
					cy.getGlobal('targetAddress')
							.then((subjectAddress: JQueryWithSelector<HTMLElement>) => {
								const addressId = subjectAddress.attr('data-test-key')
								AddressesPage.elements.address()
										.filter(`[data-test-key="${addressId}"]`)
										.then((targetAddress) => {
											AddressesPage.elements.addressesAddress(targetAddress)
													.should((targetAddress) => {
														const [, line2] = targetAddress.html().split(',')

														expect(line2.trim()).to.eq(address.line2)
													})
										})
							})
				})

				it('city has correct value', () => {
					cy.getGlobal('targetAddress')
							.then((subjectAddress: JQueryWithSelector<HTMLElement>) => {
								const addressId = subjectAddress.attr('data-test-key')
								AddressesPage.elements.address()
										.filter(`[data-test-key="${addressId}"]`)
										.then((targetAddress) => {
											AddressesPage.elements.addressesAddress(targetAddress)
													.should((targetAddress) => {
														const [,,city] = targetAddress.html().split(',')

														expect(city.trim()).to.eq(address.city)
													})
										})
							})
				})

				it('postcode has correct value', () => {
					cy.getGlobal('targetAddress')
							.then((subjectAddress: JQueryWithSelector<HTMLElement>) => {
								const addressId = subjectAddress.attr('data-test-key')
								AddressesPage.elements.address()
										.filter(`[data-test-key="${addressId}"]`)
										.then((targetAddress) => {
											AddressesPage.elements.addressesAddress(targetAddress)
													.should((targetAddress) => {
														const [,,,postcode] = targetAddress.html().split(',')

														expect(postcode.trim()).to.eq(address.postcode)
													})
										})
							})
				})
			})
		})
	})

	describe('delete address', () => {
		retryableBefore(() => {
			customerSession()
			AddressesPage.visit()
			AddressesPage.elements.address()
					.getRandom()
					.as('targetAddress')
					.then((address) => {
						AddressesPage.elements.addressesDeleteButton(address)
								.click()
					})
		})

		it('deletes the address', () => {
			cy.get('@targetAddress')
					.then((address) => {
						AddressesPage.elements.address()
								.filter(`[data-test-key="${address.attr('data-test-key')}"]`)
								.should('not.exist')
					})
		})

		describe('>>', { testIsolation: false }, () => {
			it('shows flash success message', () => {
				AddressesPage.elements.deleteSuccessFlashMessage()
						.should('exist')
			})
		})
	})
})