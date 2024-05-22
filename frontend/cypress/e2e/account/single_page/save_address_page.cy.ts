import { customerSession } from 'cypress/e2e/account/helpers/authenticate'
import { itHasAddressFields, itValidatesAddressFields } from 'cypress/e2e/common/shared_tests/address'

import { locale } from '@/translations'

import AddressesPage from '@pages/account/addresses_page'
import SaveAddressPage from '@pages/account/save_address_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'

describe('SaveAddressPage', () => {
	describe('page content', () => {
		context('when operation = create', () => {
			let currentPath, t

			retryableBefore(() => {
				customerSession()
				SaveAddressPage.visitCreate()
						.then(({ path }: { path: string }) => {
							currentPath = path
							t = locale.app['/account/addresses/[operation]/[[,,,orderId]]']
						})
			})

			it('has correct page title', () => {
				shouldHavePageTitle(t.pageTitle.replaceAll('{operation}', t.operation.create))
			})

			describe('>>', { testIsolation: false }, () => {
				it('has correct breadcrumbs', () => {
					// -2 = operation
					shouldHaveBreadcrumbs(currentPath, { removeBreadcrumb: -2, title: t.breadcrumbTitle.replaceAll('{operation}', t.operation.create) })
				})

				itHasAddressFields(SaveAddressPage)

				describe('validation', () => {
					retryableBefore(() => {
						SaveAddressPage.elements.saveButton()
								.click()
					})

					itValidatesAddressFields(SaveAddressPage)
				})
			})
		})

		context('when operation = update', () => {
			let currentPath, t

			retryableBefore(() => {
				customerSession()
				AddressesPage.visit()
						.then(() => {
							t = locale.app['/account/addresses/[operation]/[[,,,orderId]]']
						})
				AddressesPage.elements.addressesEditLink()
						.eq(0)
						.then((link) => {
							const basePath = new URL(Cypress.config().baseUrl).pathname

							currentPath = link.attr('href').slice(basePath.length) // remove basepath from link
						})
						.click()
			})

			it('has correct page title', () => {
				shouldHavePageTitle(t.pageTitle.replace('{operation}', t.operation.update))
			})

			describe('>>', { testIsolation: false }, () => {
				it('has correct breadcrumbs', () => {
					// -2 = operation
					shouldHaveBreadcrumbs(currentPath, { removeBreadcrumb: -2, title: t.breadcrumbTitle.replaceAll('{operation}', t.operation.update) })
				})

				itHasAddressFields(SaveAddressPage)

				describe('validation', () => {
					retryableBefore(() => {
						SaveAddressPage.elements.line1().clear()
						SaveAddressPage.elements.line2().clear()
						SaveAddressPage.elements.city().clear()
						SaveAddressPage.elements.postcode().clear()
						SaveAddressPage.elements.saveButton()
								.click()
					})

					itValidatesAddressFields(SaveAddressPage)
				})
			})
		})
	})
})