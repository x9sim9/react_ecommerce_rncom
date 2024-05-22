import { itHasLoginFields, itValidatesLoginFields } from 'cypress/e2e/storefront/shared_tests/login'

import { locale } from '@/translations'

import LoginPage from '@pages/storefront/login_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'

describe('LoginPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			LoginPage.visit()
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

			itHasLoginFields()

			describe('validation', () => {
				retryableBefore(() => {
					LoginPage.elements.loginButton()
							.click()
				})

				itValidatesLoginFields()
			})
		})
	})
})