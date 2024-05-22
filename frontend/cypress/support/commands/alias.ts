declare global {
	namespace Cypress {
		interface Chainable {
			asGlobal(alias: string): ReturnType<typeof cy.get>

			getGlobal(alias: string): ReturnType<typeof cy.get>
		}
	}
}

const globals = {}

/**
 * set global alias
 * @param alias the name of the alias
 */
Cypress.Commands.add('asGlobal', { prevSubject: true }, (source, alias) => {
	globals[alias] = source

	return cy.wrap(source)
})

/**
 * get global alias
 * @param alias the name of the alias
 */
Cypress.Commands.add('getGlobal', (alias) => globals[alias])

export default {}