import { loginAsCustomer } from 'cypress/e2e/storefront/helpers/customer'

import Address from '@fabricators/address'
import Customer from '@fabricators/customer'
import OrderPage from '@pages/account/order_page'
import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import ShoppingCartPage from '@pages/storefront/shopping_cart_page'

import AddressPartial from '../common/address_partial'
import { StorefrontCommon } from './storefront_common'

export type ClickNewUserButtonProps = {
	verify?: boolean
}

export type ClickSubmitOrder = {
	ignoreDisabled?: boolean
	verify?: boolean
}


export type VisitProps = {
	verify?: boolean
}

export type LoginAsCustomerProps = {
	verify?: boolean
}

export type PlaceOrderProps = {
	existingAddress?: boolean
	newUser?: boolean
	verify?: boolean
}

/**
 * Page Object Model for CheckoutPage
 */
export class CheckoutPage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,
		checkoutSuccessFlashMessage: this.get('[data-testid="ui.flash.message"]', (get) => get.filter('[date-test-key="storefront.shoppingCart.createOrderSuccess"]')),
		city: AddressPartial.elements.city({ idPrefix: 'storefront.shoppingCart.checkout' }),
		confirmPassword: this.get('[data-testid="storefront.shoppingCart.checkout.confirmPassword"]'),
		emailAddress: this.get('[data-testid="storefront.shoppingCart.checkout.emailAddress"]'),
		existingAddressOption: this.get('[data-testid="storefront.shoppingCart.checkout.addressId"]', (get) => get.find('input[type=hidden]')),
		existingAddressOptionHiddenField: this.get('input[data-testid="storefront.shoppingCart.checkout.addressId"]'),
		existingAddressOptionSelect: this.get('span[data-testid="storefront.shoppingCart.checkout.addressId"]'),
		firstName: this.get('[data-testid="storefront.shoppingCart.checkout.firstName"]'),
		lastName: this.get('[data-testid="storefront.shoppingCart.checkout.lastName"]'),
		line1: AddressPartial.elements.line1({ idPrefix: 'storefront.shoppingCart.checkout' }),
		line2: AddressPartial.elements.line2({ idPrefix: 'storefront.shoppingCart.checkout' }),
		loginButton: this.get('[data-testid="common.customer.loginButton"]'),
		newUserButton: this.get('[data-testid="storefront.shoppingCart.checkout.newUserButton"]'),
		password: this.get('[data-testid="storefront.shoppingCart.checkout.password"]'),
		phoneNumber: this.get('[data-testid="storefront.shoppingCart.checkout.phoneNumber"]'),
		postcode: AddressPartial.elements.postcode({ idPrefix: 'storefront.shoppingCart.checkout' }),
		shippingOption: this.get('[data-testid="storefront.shoppingCart.checkout.shippingId"]', (get) => get.find('input[type=hidden]')),
		shippingOptionSelect: this.get('[data-testid="storefront.shoppingCart.checkout.shippingId"]'),
		shippingTotal: this.get('[data-testid="storefront.shoppingCart.checkout.shippingTotal"]'),
		submitOrderButton: this.get('[data-testid="storefront.shoppingCart.checkout.submitOrder"]'),
		subtotal: this.get('[data-testid="storefront.shoppingCart.checkout.subtotal"]'),
		tax: this.get('[data-testid="storefront.shoppingCart.checkout.taxTotal"]'),
		total: this.get('[data-testid="storefront.shoppingCart.checkout.total"]'),
	}

	/**
	 * add products to cart
	 * @param props addProductsToCart props
	 * @param props.quantity the number of products to add
	 * @param props.verify verify the products in cart
	 */
	addProductsToCart(props?: { quantity?: number, verify?: boolean }) {
		CategoriesPage.visit()
		CategoriesPage.elements.categoryLink()
				.getRandom()
				.click()

		CategoryPage.addProductsToCart({ quantity: props?.quantity, verify: props?.verify })
		ShoppingCartPage.visit()
		ShoppingCartPage.elements.lineItemProductQuantity()
				.each((productQuantity, index) => {
					cy.wrap(productQuantity).asGlobal(`lineItemProductQuantity${index}`)
				})
		ShoppingCartPage.elements.lineItemProductPrice()
				.each((productPrice, index) => {
					cy.wrap(productPrice).asGlobal(`lineItemProductPrice${index}`)
				})
		ShoppingCartPage.elements.lineItemProductName()
				.each((productName, index) => {
					cy.wrap(productName).asGlobal(`lineItemProductName${index}`)
				})
		ShoppingCartPage.elements.subtotal().asGlobal('cartSubtotal')
		ShoppingCartPage.elements.tax().asGlobal('cartTax')
		ShoppingCartPage.elements.total().asGlobal('cartTotal')
	}

	/**
	 * clicks the new user button
	 * @param options clickNewUserButton options
	 * @param options.verify verify the click was successful
	 */
	clickNewUserButton(options?: ClickNewUserButtonProps): void {
		this.elements.newUserButton()
				.click()

		if (options?.verify !== false) {
			this.elements.firstName()
					.should('exist')
		}
	}

	/**
	 * clicks the submit order button
	 * @param options clickSubmitOrder options
	 * @param options.verify verify the click was successful
	 */
	clickSubmitOrder(options?: ClickSubmitOrder): void {
		if (options?.ignoreDisabled) {
			this.elements.submitOrderButton()
					.invoke('attr', 'disabled')
					.then((disabled) => {
						if (disabled) {
							cy.log('submitOrderButton is disabled')
						} else {
							this.elements.submitOrderButton().click()
						}
					})
		} else {
			this.elements.submitOrderButton()
					.click()
		}


		if (options?.verify !== false) {
			this.elements.shippingOptionSelect()
					.should('not.exist')
			OrderPage.elements.orderFriendlyId()
					.should('exist')
		}
	}

	/**
	 * login as a customer
	 * @param options loginAsCustomer options
	 * @param options.verify verify the login was successful
	 */
	loginAsCustomer(options?: LoginAsCustomerProps) {
		loginAsCustomer({ verify: false })

		if (options?.verify !== false) {
			this.elements.line1()
					.should('exist')
		}
	}

	/**
	 * place an order with randomly generated data
	 * @param options placeOrder options
	 * @param options.verify verify the login was successful
	 * @param options.newUser if new user
	 * @param options.existingAddress select an existing address
	 */
	placeOrder(options?: PlaceOrderProps) {
		if (options?.newUser) {
			const customer = (new Customer)
			this.elements.firstName()
					.type(customer.firstName)
					.asGlobal('checkoutFirstName')
			this.elements.lastName()
					.type(customer.firstName)
					.asGlobal('checkoutLastName')
			this.elements.emailAddress()
					.type(customer.emailAddress)
					.asGlobal('checkoutEmailAddress')
			this.elements.phoneNumber()
					.type(customer.phoneNumber)
					.asGlobal('checkoutPhoneNumber')
			this.elements.password()
					.type(customer.password)
			this.elements.confirmPassword()
					.type(customer.password)
		}

		const address = (new Address)
		this.elements.shippingOptionSelect()
				.changeSelect({ first: true })
		this.elements.subtotal().asGlobal('checkoutSubtotal')
		this.elements.shippingTotal().asGlobal('checkoutShippingTotal')
		this.elements.tax().asGlobal('checkoutTax')
		this.elements.total().asGlobal('checkoutTotal')

		if (options?.existingAddress) {
			this.elements.existingAddressOptionSelect()
					.changeSelect({ last: true })

			this.elements.existingAddressOptionSelect()
					.selectLabel()
					.asGlobal('checkoutAddress')
		} else {
			this.elements.line1()
					.type(address.line1)
					.asGlobal('checkoutLine1')
			this.elements.line2()
					.type(address.line2)
					.asGlobal('checkoutLine2')
			this.elements.city()
					.type(address.city)
					.asGlobal('checkoutCity')
			this.elements.postcode()
					.type(address.postcode)
					.asGlobal('checkoutPostcode')
		}

		this.clickSubmitOrder()

		if (options?.verify !== false) {
			OrderPage.elements.orderFriendlyId()
					.should('exist')
		}
	}

	/**
	 * visit the CheckoutPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('checkoutPage').as('targetRoute')

		if (options?.verify !== false) {
			cy.get('[data-testid="common.customer.loginButton"], [data-testid="storefront.shoppingCart.checkout.submitOrder"]').should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new CheckoutPage)