import { locale } from '@/translations'

import HomePage from '@pages/storefront/home_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom/basic'
import { retryableBefore } from '@support/helpers/before'
import { categoryUrl } from '@support/helpers/matchers'

const basePath = new URL(Cypress.config().baseUrl).pathname

describe('HomePage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			HomePage.visit()
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

			describe('all categories panel', () => {
				it('has valid all categories link', () => {
					HomePage.elements.allCategoriesLink()
							.should('have.attr', 'href', basePath + '/' + locale.app['/categories'].urlName)
				})

				it('has at least 3 categories', () => {
					HomePage.elements.categoriesList()
							.should('have.length.greaterThan', 3)
				})

				describe('each category', () => {
					it('has valid link', () => {
						HomePage.elements.categoriesList().each((item) => {
							expect(item).to.have.attr('href')
							expect(item.attr('href')).to.match(categoryUrl)
						})
					})

					it('has valid label', () => {
						HomePage.elements.categoriesList().each((item) => {
							expect(item.html()).to.not.be.empty
						})
					})
				})
			})
		})
	})
})