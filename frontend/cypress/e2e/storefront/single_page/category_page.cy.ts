import { locale } from '@/translations'

import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import { shouldHaveBreadcrumbs } from '@support/dom'
import { retryableBefore } from '@support/helpers/before'
import { decimalValue, productUrl, title } from '@support/helpers/matchers'

describe('CategoryPage', () => {
	describe('page content', () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
		let currentPath, t

		retryableBefore(() => {
			CategoriesPage.visit()
					.then(({ path }: { path: string }) => {
						currentPath = path + CategoriesPage.paths.categoryPage
						t = locale.app[currentPath]
					})
			CategoriesPage.clickFirstCategory()
		})

		it('has valid page title', () => {
			CategoryPage.elements.pageTitle()
					.invoke('text')
					.should('match', title)
		})

		describe('>>', { testIsolation: false }, () => {
			it('has valid breadcrumbs', () => {
				// -2 = category id
				// -1 = category name
				shouldHaveBreadcrumbs(currentPath, { removeBreadcrumb: [-2, -1] })
			})

			it('has at least 3 products', () => {
				CategoryPage.elements.productLink()
						.should('have.length.greaterThan', 3)
			})

			describe('each product', () => {
				it('has valid link', () => {
					CategoryPage.elements.productLink().each((item) => {
						expect(item).to.have.attr('href')
						expect(item.attr('href')).to.match(productUrl)
					})
				})

				it('has valid product name', () => {
					CategoryPage.elements.productName().each((item) => {
						expect(item.text()).to.not.be.empty
					})
				})

				it('has product image', () => {
					CategoryPage.elements.productImage().each((item) => {
						expect(item).to.have.attr('src')
					})
				})

				it('has product price', () => {
					CategoryPage.elements.productPrice().each((item) => {
						expect(item.text()).to.match(decimalValue)
					})
				})
			})
		})
	})
})