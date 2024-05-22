import { describe } from 'mocha'

import CategoriesPage from '@pages/storefront/categories_page'
import CategoryPage from '@pages/storefront/category_page'
import HomePage from '@pages/storefront/home_page'
import ProductPage from '@pages/storefront/product_page'
import { retryableBefore } from '@support/helpers/before'

describe('Feature: Browsing Products', () => {
	describe('navigate to category', () => {
		describe('from page header', () => {
			retryableBefore(() => {
				HomePage.visit()
			})

			it('navigates to category', () => {
				HomePage.elements.headerAllCategories()
						.click()
				HomePage.elements.headerCategory()
						.getRandom()
						.then((category) => {
							cy.wrap(category)
							cy.wrap(category)
									.click()
							CategoriesPage.elements.pageTitle()
									.should('contain', category.text())
						})
			})
		})

		describe('from home page', () => {
			retryableBefore(() => {
				HomePage.visit()
			})

			it('navigates to category', () => {
				HomePage.elements.categoriesList()
						.getRandom()
						.then((category) => {
							cy.wrap(category).click()
							CategoriesPage.elements.pageTitle()
									.should('contain', category.text())
						})
			})
		})

		describe('from all categories page', () => {
			retryableBefore(() => {
				CategoriesPage.visit()
			})

			it('navigates to category', () => {
				CategoriesPage.elements.categoryLink()
						.getRandom()
						.then((category) => {
							cy.wrap(category).click()
							CategoriesPage.elements.pageTitle()
									.should('contain', category.text())
						})
			})
		})
	})

	describe('navigate to product', () => {
		retryableBefore(() => {
			CategoriesPage.visit()
			CategoriesPage.elements.categoryLink()
					.getRandom()
					.click()
		})

		it('navigates to product', () => {
			CategoryPage.elements.productLink()
					.getRandom()
					.then((product) => {
						CategoryPage.elements.productName(product).then((productName) => {
							cy.wrap(product).click()
							ProductPage.elements.name()
									.should('contain', productName.text())
						})
					})
		})
	})
})