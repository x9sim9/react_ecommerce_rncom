
import { AccountCommon } from './account_common'

export type ClickFirstProductProps = {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for OrdersPage
 */
class OrdersPage extends AccountCommon {
	elements = {
		...this.accountElements,

		order: this.get('[data-testid="account.order.order"]'),
		orders: this.get('[data-testid="account.order.orderList"]'),
		ordersDate: this.get('[data-testid="account.order.orderList.orderDate"]'),
		ordersIdLink: this.get('[data-testid="account.order.orderList.idViewOrderLink"]'),
		ordersLink: this.get('[data-testid="account.order.orderList.viewOrderLink"]'),
		ordersOrderFriendlyId: this.get('[data-testid="account.order.orderList.orderId"]'),
		ordersQuantity: this.get('[data-testid="account.order.orderList.lineItemsLength"]'),
		ordersTotal: this.get('[data-testid="account.order.orderList.orderTotal"]'),
	}

	/**
	 * visit the OrdersPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('ordersPage', { section: 'account' }).as('targetRoute')

		if (options?.verify !== false) {
			this.elements.orders()
					.should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new OrdersPage)