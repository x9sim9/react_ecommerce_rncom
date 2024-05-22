
import AddressPartial from '../common/address_partial'
import { AccountCommon } from './account_common'

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for SaveAddressPage
 */
export class SaveAddressPage extends AccountCommon {
	elements = {
		...this.accountElements,

		city: AddressPartial.elements.city({ idPrefix: 'crud.saveRecord.field' }),
		line1: AddressPartial.elements.line1({ idPrefix: 'crud.saveRecord.field' }),
		line2: AddressPartial.elements.line2({ idPrefix: 'crud.saveRecord.field' }),
		postcode: AddressPartial.elements.postcode({ idPrefix: 'crud.saveRecord.field' }),
		saveButton: this.get('[data-testid="crud.saveRecord.saveButton"]'),
	}

	/**
	 * visit the create address page
	 * @param options visitCreate options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visitCreate(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('addressPageCreate', { section: 'account' }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.line1()
					.should('exist')
		}

		return cy.get('@targetRoute')
	}

	/**
	 * visit the update address page
	 * @param addressId the id for the address
	 * @param options visitUpdate options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visitUpdate(addressId: number | string, options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('addressPageUpdate', { params: { addressId }, section: 'account' }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.accountMenu()
					.should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new SaveAddressPage)