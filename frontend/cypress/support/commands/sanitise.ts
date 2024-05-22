import { sanitizeFixed, sanitizeFloat, sanitizeInt } from '@support/helpers'

declare global {
	namespace Cypress {
		interface Chainable {
			sanitiseFixed(precision?: number): ReturnType<typeof cy.get>

			sanitiseFloat(): ReturnType<typeof cy.get>

			sanitiseInt(): ReturnType<typeof cy.get>
		}
	}
}

/**
 * remove any text that is not a float number
 * @param source the previous subject
 * @param precision the number of decimal places
 * @returns the previous subject
 */
Cypress.Commands.add('sanitiseFixed', { prevSubject: true }, (source, precision = 2) => (
	cy.wrap(source).each((item) => {
		item.html(`${sanitizeFixed(item.html(), precision)}`)
		return item
	})
))

/**
 * remove any text that is not a float number
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('sanitiseFloat', { prevSubject: true }, (source) => (
	cy.wrap(source).each((item) => {
		item.html(`${sanitizeFloat(item.html())}`)
		return item
	})
))

/**
 * remove any text that is not an integer number
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('sanitiseInt', { prevSubject: true }, (source) => (
	cy.wrap(source).each((item) => {
		item.html(`${sanitizeInt(item.html())}`)
		return item
	})
))

export default {}