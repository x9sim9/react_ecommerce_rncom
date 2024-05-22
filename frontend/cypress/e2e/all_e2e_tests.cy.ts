if (Cypress.env('RUNNER') !== 'cypress-parallel') {
	// @ts-expect-error ignore not a module warning
	import('./account/all_account.cy')
	// @ts-expect-error ignore not a module warning
	import('./storefront/all_storefront.cy')
}

