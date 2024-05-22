
import { StorefrontCommon } from '../storefront/storefront_common'

/**
 * shared functionality for all account pages
 */
export class AccountCommon extends StorefrontCommon {
	accountElements = {
		...this.storefrontElements,

		accountMenu: this.get('[data-testid="account.pageContent.menu"]'),
		accountMenuAddressesLink: this.get('[data-testid="account.pageContent.addressesLink"]'),
		accountMenuHomeLink: this.get('[data-testid="account.pageContent.homeLink"]'),
		accountMenuOrdersLink: this.get('[data-testid="account.pageContent.ordersLink"]'),
		headerAccountMenu: this.get('[data-testid="common.account.accountNavitem.myAccount"]'),
		headerAccountMenuAccountAddressesLink: this.get('[data-testid="common.account.accountNavitem.accountAddresses"]'),
		headerAccountMenuAccountHomeLink: this.get('[data-testid="common.account.accountNavitem.accountHome"]'),
		headerAccountMenuAccountOrdersLink: this.get('[data-testid="common.account.accountNavitem.accountOrders"]'),
		headerAccountMenuLogoutButton: this.get('[data-testid="common.account.accountNavitem.logout"]'),
	}
	elements = {
		...this.accountElements,
	}

	/**
	 * logout the logged in customer
	 */
	logout() {
		this.elements.headerAccountMenu()
				.click()

		this.elements.headerAccountMenuLogoutButton()
				.click()
	}
}

export default (new AccountCommon)