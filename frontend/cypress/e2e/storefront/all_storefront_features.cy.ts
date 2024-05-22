if (Cypress.env('RUNNER') !== 'cypress-parallel') {
	import('./features')
}