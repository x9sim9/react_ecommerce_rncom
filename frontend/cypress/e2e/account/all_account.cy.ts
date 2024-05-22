if (Cypress.env('RUNNER') !== 'cypress-parallel') {
	import('./features')
	import('./single_page')
}