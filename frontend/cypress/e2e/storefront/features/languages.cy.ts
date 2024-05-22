import HomePage from '@pages/storefront/home_page'
import { retryableBefore } from '@support/helpers/before'

describe('Feature: Languages', () => {
	describe('change language from header', () => {
		retryableBefore(() => {
			HomePage.visit()
		})

		it('changes the language', () => {
			HomePage.elements.headerLanguage()
					.click()

			HomePage.elements.headerLanguages()
					.getRandom()
					.then((language) => {
						const languageCode = language.attr('data-test-key')

						cy.wrap(language).click()
						cy.url().should('match', new RegExp(`/${languageCode}$`))
					})
		})
	})

	describe('change language from footer', () => {
		retryableBefore(() => {
			HomePage.visit()
		})

		it('changes the language', () => {
			HomePage.elements.footerLanguages()
					.getRandom()
					.then((language) => {
						const languageCode = language.attr('data-test-key')

						cy.wrap(language).click()
						cy.url().should('match', new RegExp(`/${languageCode}$`))
					})
		})
	})
})