
import { AccountCommon } from './account_common'

export type ClickFirstProductProps = {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for AccountHomePage
 */
class AccountHomePage extends AccountCommon {
	elements = {
		...this.accountElements,

		addresses: this.get('[data-testid="crud.listRecords.addresses.rows"]'),
		addressesAddress: this.get('[data-testid="crud.listRecords.addresses.cell.address"]'),
		addressesDeleteButton: this.get('[data-testid="crud.listRecords.addresses.deleteButton"]'),
		addressesEditLink: this.get('[data-testid="crud.listRecords.addresses.updateLink"]'),
		recentOrders: this.get('[data-testid="account.order.orderList"]'),
		recentOrdersDate: this.get('[data-testid="account.order.orderList.orderDate"]'),
		recentOrdersLink: this.get('[data-testid="account.order.orderList.viewOrderLink"]'),
		recentOrdersOrderFriendlyId: this.get('[data-testid="account.order.orderList.orderId"]'),
		recentOrdersQuantity: this.get('[data-testid="account.order.orderList.lineItemsLength"]'),
		recentOrdersTotal: this.get('[data-testid="account.order.orderList.orderTotal"]'),
	}

	/**
	 * visit the AccountHomePage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('accountHomePage', { section: 'account' }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.accountMenu()
					.should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new AccountHomePage)