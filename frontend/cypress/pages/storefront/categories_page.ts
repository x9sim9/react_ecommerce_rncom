import CategoryPage from '@pages/storefront/category_page'

import { StorefrontCommon } from './storefront_common'
import JQueryWithSelector = Cypress.JQueryWithSelector

export type ClickFirstCategoryProps = {
	verify?: boolean
}

export type VisitProps = {
	verify?: boolean
}

/**
 * Page Object Model for CategoriesPage
 */
class CategoriesPage extends StorefrontCommon {
	elements = {
		...this.storefrontElements,

		categoryImage: this.get('[data-testid="categoriesPage.categories"]', (get) => get.find('[data-testid="categoriesPage.category.image"]')),
		categoryLink: this.get('[data-testid="categoriesPage.categories"]', (get) => get.find('[data-testid="categoriesPage.category.link"]')),
		categoryName: this.get('[data-testid="categoriesPage.categories"]', (get) => get.find('[data-testid="categoriesPage.category.name"]')),
	}
	paths = {
		categoryPage: '/[categoryId]/[categorySlug]',
		productPage: '/[categoryId]/[categorySlug]/[productId]/[...slug]',
	}

	/**
	 * click the first category
	 * @param options clickFirstCategory options
	 * @param options.verify verify the click was successful
	 */
	clickFirstCategory(options?: ClickFirstCategoryProps) {
		if (options?.verify !== false) {
			this.elements.categoryName().eq(0).asGlobal('categoryName')
		}

		this.elements.categoryLink().eq(0).click()

		if (options?.verify !== false) {
			cy.getGlobal('categoryName').then((name: JQueryWithSelector) => {
				CategoryPage.elements.pageTitle()
						.should('contain', name.text())
			})
		}
	}

	/**
	 * visit the CategoriesPage
	 * @param options visit options
	 * @param options.verify verify the visit was successful
	 * @returns the route
	 */
	visit(options?: VisitProps): ReturnType<typeof cy.get> {
		cy.visitRoute('categoriesPage').as('targetRoute')

		if (options?.verify !== false) {
			cy.get('[data-testid="categoriesPage.category.image"]').should('exist')
		}

		return cy.get('@targetRoute')
	}
}

export default (new CategoriesPage)