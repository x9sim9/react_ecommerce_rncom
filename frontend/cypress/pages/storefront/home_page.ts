
import { StorefrontCommon } from './storefront_common'

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for HomePage
 */
class HomePage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,

		allCategoriesLink: this.get('[data-testid="storefront.product.categories"]', (get) => get.find('[data-testid="storefront.product.categories.allCategoriesLink"]')),
		categoriesList: this.get('[data-testid="storefront.product.categories"]', (get) => get.find('[data-testid="ui.slug.categoryLink"]')),
	}

	/**
	 * visit the HomePage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('homePage').as('targetRoute')

		if (options?.verify !== false) {
			cy.scrollTo('top')
			cy.get('[data-testid="storefront.product.categories.allCategoriesLink"]').should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new HomePage)