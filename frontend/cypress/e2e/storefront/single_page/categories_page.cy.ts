import { locale } from '@/translations'

import CategoriesPage from '@pages/storefront/categories_page'
import { shouldHaveBreadcrumbs, shouldHavePageTitle } from '@support/dom/basic'
import { retryableBefore } from '@support/helpers/before'
import { categoryUrl } from '@support/helpers/matchers'

describe('CategoriesPage', () => {
	describe('page content', () => {
		let currentPath, t

		retryableBefore(() => {
			CategoriesPage.visit()
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

			it('has at least 3 categories', () => {
				CategoriesPage.elements.categoryLink()
						.should('have.length.greaterThan', 3)
			})

			describe('each category', () => {
				it('has valid link', () => {
					CategoriesPage.elements.categoryLink().each((item) => {
						expect(item).to.have.attr('href')
						expect(item.attr('href')).to.match(categoryUrl) // category url
					})
				})

				it('has valid label', () => {
					CategoriesPage.elements.categoryName().each((item) => {
						expect(item.text()).to.not.be.empty
					})
				})

				it('has image', () => {
					CategoriesPage.elements.categoryImage().each((item) => {
						expect(item).to.have.attr('src')
					})
				})
			})
		})
	})
})