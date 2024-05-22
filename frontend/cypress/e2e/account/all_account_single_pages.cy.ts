if (Cypress.env('RUNNER') !== 'cypress-parallel') {
	import('./single_page')
}