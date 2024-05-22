if (Cypress.env('RUNNER') !== 'cypress-parallel') {
	import('./account/features')
	import('./storefront/features')
}
