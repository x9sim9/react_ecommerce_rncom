import type { PickOfValue } from '../../../src/helpers/typescript'
import routes from '../helpers/route'

type Route = typeof routes

declare global {
	namespace Cypress {
		interface Chainable {
			visitRoute(
				route: keyof PickOfValue<Route['account'], string>, // routes that are strings
				extra?: {
					params?: never,
					section: 'account'
				}): ReturnType<typeof cy.get>

			visitRoute(
				route: keyof PickOfValue<Route['storefront'], string>, // routes that are strings
				extra?: {
					params?: never,
					section: 'storefront'
				}): ReturnType<typeof cy.get>

			visitRoute(
				route: keyof PickOfValue<Route['storefront'], string>, // routes that are strings
				extra?: {
					params?: never,
					section?: never
				}): ReturnType<typeof cy.get>

			visitRoute<R extends keyof PickOfValue<Route['account'], Exclude<Route['account'][keyof Route['account']], string>> = keyof PickOfValue<Route['account'], Exclude<Route['account'][keyof Route['account']], string>>>(
				route: R, // routes that are functions
				extra: {
					params: Parameters<Exclude<Route['account'][R], string>>[0],
					section: 'account'
				}): ReturnType<typeof cy.get>

			visitRoute<R extends keyof PickOfValue<Route['storefront'], Exclude<Route['storefront'][keyof Route['storefront']], string>> = keyof PickOfValue<Route['storefront'], Exclude<Route['storefront'][keyof Route['storefront']], string>>>(
				route: R, // routes that are functions
				extra: {
					params: Parameters<Exclude<Route['storefront'][R], string>>[0],
					section: 'storefront'
				}): ReturnType<typeof cy.get>

			visitRoute<R extends keyof PickOfValue<Route['storefront'], Exclude<Route['storefront'][keyof Route['storefront']], string>> = keyof PickOfValue<Route['storefront'], Exclude<Route['storefront'][keyof Route['storefront']], string>>>(
				route: R, // routes that are functions
				extra: {
					params: Parameters<Exclude<Route['storefront'][R], string>>[0],
					section?: never
				}): ReturnType<typeof cy.get>
		}
	}
}

/**
 * visit a route defined in @support/helpers/route.ts
 * @param route the name of the router
 * @param extra options for the route e.g. id for productPage
 * @param extra.section the section for the route i.e. account or storefront (default)
 */
Cypress.Commands.add('visitRoute', (route, extra) => {
	const { params, section } = {
		section: 'storefront' as const,
		...extra as Omit<typeof extra, 'section'>,
	}

	let url: string
	if (typeof routes[section][route] === 'function') {
		url = routes[section][route](params) as string
	} else {
		url = routes[section][route].toString()
	}

	return cy.visit(url)
			.then(() => ({ path: url, url }))
})