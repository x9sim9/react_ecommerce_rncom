if (Cypress.env('RUNNER') !== 'cypress-parallel') {
	import('./account/single_page')
	import('./storefront/single_page')
}
