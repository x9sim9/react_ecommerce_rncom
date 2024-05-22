import Chainable = Cypress.Chainable
import JQueryWithSelector = Cypress.JQueryWithSelector

type JQuery<TElement = HTMLElement> = Omit<JQueryWithSelector<TElement>, 'selector'>

type GetOrFind = Chainable<JQuery<HTMLElement>> | JQuery<HTMLElement> | ReturnType<typeof cy.get> | typeof cy.get

/**
 * Document Object Model selector
 * @param selector the jquery selector
 * @param then run jquery commands on the result of the selector
 * @returns the result of the selector (including after)
 */
const get = (selector: string, then?: (get: Chainable<JQuery<HTMLElement>> | JQuery<HTMLElement>) =>

		/**
		 * run jquery commands on the result of the selector
		 * @param get the result of the selector
		 */
		Chainable<JQuery<HTMLElement>> | JQuery<HTMLElement>) => <T extends boolean = false, R = T extends false ? Chainable<JQuery<HTMLElement>> : JQuery<HTMLElement>>(target?: GetOrFind, options?: {
	skipWrap: T
}): R =>

		/**
		 * Document Object Model inner selector
		 * @param target the jquery result to search inside
		 * @param options extra options
		 * @param options.skipWrap returns the jquery selector instead of a cypress chainable selector
		 */
		// eslint-disable-next-line @stylistic/brace-style
{
	let result: R

	if (options?.skipWrap) {
		result = (target as JQuery<HTMLElement>).find(selector) as R
	}

	if (!result && target === cy.get) {
		result = target(selector) as R
	}

	// @ts-expect-error could not resolve key as cypress does not export it
	if (!result && target?.chainerId) {
		result = (target as ReturnType<typeof cy.get>).find(selector) as R
	} else if (!result && target) {
		result = cy.wrap(target as JQuery<HTMLElement>).find(selector) as R
	}

	if (!result) {
		result = cy.get(selector) as R
	}

	if (then) {
		result = then(result as Chainable<JQuery<HTMLElement>> | JQuery<HTMLElement>) as R
	}
	return result
}

export type GetArgs = Parameters<ReturnType<typeof get>>


/**
 * shared functionality for all pages
 */
export class Common {
	// eslint-disable-next-line perfectionist/sort-classes
	protected get = get
	// eslint-disable-next-line perfectionist/sort-classes
	commonElements = {
		breadcrumb: this.get('[data-testid="common.breadcrumb.link"]'),
		footerLanguages: this.get('[data-testid="common.footer"]', (get) => get.find('[data-testid="common.languages.language"]')),
		headerAllCategories: this.get('[data-testid="common.header.allCategories"]'),
		headerCategory: this.get('[data-testid="common.header.allCategories"]', (get) => get.parent().find('[data-testid="ui.slug.categoryLink"]')),
		headerLanguage: this.get('[data-testid="common.header"]', (get) => get.find('[data-testid="common.languages"]')),
		headerLanguages: this.get('[data-testid="common.header"]', (get) => get.find('[data-testid="common.languages.language"]')),
		pageTitle: this.get('[data-testid="common.pageTitle.title"]'),
	}
	elements = {
		...this.commonElements,
	}
}

export default (new Common)