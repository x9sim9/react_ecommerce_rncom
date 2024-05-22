import JQueryWithSelector = Cypress.JQueryWithSelector

type JQuery<TElement = HTMLElement> = Omit<JQueryWithSelector<TElement>, 'selector'>

declare global {
	namespace Cypress {
		interface Chainable {
			getRandom(): Chainable<JQuery<HTMLElement>>
		}
	}
}

/**
 * pick random element from list
 * @param source the previous subject
 * @returns the random element
 */
Cypress.Commands.add('getRandom', { prevSubject: true }, (source) => cy.wrap(source).eq(Math.floor(Math.random() * source.length)))

export default {}