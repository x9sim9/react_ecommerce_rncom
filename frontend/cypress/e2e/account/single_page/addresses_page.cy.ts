import { customerSession } from 'cypress/e2e/account/helpers/authenticate'

import { locale } from '@/translations'

import AddressesPage from '@pages/account/addresses_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'
import { addressSingleLine, crudUpdateUrl } from '@support/helpers/matchers'

describe('AddressesPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			customerSession()
			AddressesPage.visit()
					.then(({ path }: { path: string }) => {
						currentPath = path
						t = locale.app[currentPath]
					})
		})

		it('has correct page title', () => {
			shouldHavePageTitle(t.pageTitle)
		})

		describe('>>', { testIsolation: false }, () => {
			it('has correct breadcrumbs', () => {
				shouldHaveBreadcrumbs(currentPath)
			})

			it('has at least one address', () => {
				AddressesPage.elements.addresses()
						.should('have.length.at.least', 1)
			})

			describe('each address', () => {
				it('has address', () => {
					AddressesPage.elements.addressesAddress().each((address) => {
						expect(address.text()).to.match(addressSingleLine)
					})
				})

				it('has valid edit link', () => {
					AddressesPage.elements.addressesEditLink().each((link) => {
						expect(link.attr('href')).to.match(crudUpdateUrl)
					})
				})
			})
		})
	})
})