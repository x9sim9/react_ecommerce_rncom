import { Common } from '@pages/common'

/**
 * shared functionality for all storefront pages
 */
export class StorefrontCommon extends Common {
	storefrontElements = {
		...this.commonElements,

		headerCartQuantity: this.get('[data-testid="storefront.shoppingCart.smallCart.quantity"]'),
		headerCartSummary: this.get('[data-testid="storefront.shoppingCart.smallCart.cartSummary"]'),
		headerCartTotal: this.get('[data-testid="storefront.shoppingCart.smallCart.total"]'),
	}
	// eslint-disable-next-line perfectionist/sort-classes
	elements = {
		...this.storefrontElements,
	}
}

export default (new StorefrontCommon)