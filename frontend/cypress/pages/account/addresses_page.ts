
import { AccountCommon } from './account_common'

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for AddressesPage
 */
class AddressesPage extends AccountCommon {
	elements = {
		...this.accountElements,

		address: this.get('[data-testid="crud.listRecords.addresses.row"]'),
		addresses: this.get('[data-testid="account.customer.addressList"]'),
		addressesAddLink: this.get('[data-testid="crud.listRecords.addresses.createLink"]'),
		addressesAddress: this.get('[data-testid="crud.listRecords.addresses.cell.address"]'),
		addressesDeleteButton: this.get('[data-testid="crud.listRecords.addresses.deleteButton"]'),
		addressesEditLink: this.get('[data-testid="crud.listRecords.addresses.updateLink"]'),
		deleteSuccessFlashMessage: this.get('[data-testid="ui.flash.message"]', (get) => get.filter('[date-test-key="crud.listRecords.deleteSuccess"]')),
		saveSuccessFlashMessage: this.get('[data-testid="ui.flash.message"]', (get) => get.filter('[date-test-key="crud.saveRecord.saveSuccess"]')),

	}

	/**
	 * visit the AddressesPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('addressesPage', { section: 'account' }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.accountMenu()
					.should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new AddressesPage)