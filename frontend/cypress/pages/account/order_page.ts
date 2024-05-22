
import { AccountCommon } from './account_common'


export type ClickFirstProductProps = {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for OrderPage
 */
export class OrderPage extends AccountCommon {
	elements = {
		...this.accountElements,

		city: this.get('[data-testid="OrderPage.address.city"]'),
		line1: this.get('[data-testid="OrderPage.address.line1"]'),
		line2: this.get('[data-testid="OrderPage.address.line2"]'),
		lineItem: this.get('[data-testid="OrderPage.lineItem"]'),
		lineItemProductImage: this.get('[data-testid="storefront.product.productImage.image"]'),
		lineItemProductLink: this.get('[data-testid="OrderPage.productLink"]'),
		lineItemProductName: this.get('[data-testid="OrderPage.productName"]'),
		lineItemProductPrice: this.get('[data-testid="OrderPage.productPrice"]'),
		lineItemProductQuantity: this.get('[data-testid="OrderPage.lineItemQuantity"]'),
		lineItemProductSubtotal: this.get('[data-testid="OrderPage.productSubtotal"]'),
		lineItems: this.get('[data-testid="OrderPage.lineItems"]'),
		orderDate: this.get('[data-testid="OrderPage.orderDate"]'),
		orderFriendlyId: this.get('[data-testid="OrderPage.orderFriendlyId"]'),
		orderTotal: this.get('[data-testid="OrderPage.orderTotal"]'),
		postcode: this.get('[data-testid="OrderPage.address.postcode"]'),
		shippingTotal: this.get('[data-testid="OrderPage.shippingTotal"]'),
	}
}

export default (new OrderPage)