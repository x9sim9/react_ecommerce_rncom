declare global {
	namespace Cypress {
		interface Chainable {
			clearPhoneNumber(): ReturnType<typeof cy.get>
		}
	}
}

const globals = {}

/**
 * clears a phone number form field
 * @returns the field
 */
Cypress.Commands.add('clearPhoneNumber', { prevSubject: true }, (source) => {
	cy.wrap(source).clear()
	return cy.wrap(source).type(' ')
})


export default {}