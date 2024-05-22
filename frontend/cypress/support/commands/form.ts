import JQueryWithSelector = Cypress.JQueryWithSelector

declare global {
	namespace Cypress {
		interface Chainable {
			changeSelect(options?: { first?: boolean, last?: boolean, selectedLabel?: string, selectedLabelContains?: string, verify?: boolean }): ReturnType<typeof cy.get>

			clearSelect(options?: { verify?: boolean }): ReturnType<typeof cy.get>

			hasFormValidationError(): ReturnType<typeof cy.get>

			hasNoValidationError(): ReturnType<typeof cy.get>

			hasValidationError(): ReturnType<typeof cy.get>

			selectLabel(): ReturnType<typeof cy.get>

			selectLabelContains(value: string): ReturnType<typeof cy.get>
		}
	}
}

/**
 * change ui.form.select selected option
 * @param source the previous subject
 * @param options change options
 * @param options.selectedLabel the label to select (exact match)
 * @param options.selectedLabelContains the label to select (partial match)
 * @param options.last select the last option
 * @param options.verify verify the option changed
 * @returns the previous subject
 */
Cypress.Commands.add('changeSelect', { prevSubject: true }, (source, options) => {
	// NOTE: The selects don't seem to work well with jquery selectors, hence the use of all cy commands here
	const changeSelect = (item: JQueryWithSelector<HTMLElement>) => {
		cy.wrap(item).find('[class$="-control"]')
				.click()

		if (options?.selectedLabel) {
			cy.wrap(item).find(`[class$="-option"]:contains(${options.selectedLabel})`)
					.filter((_, element) => element.innerHTML === options.selectedLabel)
					.click()
		} else if (options?.selectedLabelContains) {
			cy.wrap(item).find(`[class$="-option"]:contains(${options.selectedLabelContains})`)
					.click()
		} else if (options?.first) {
			cy.wrap(item).find('[class$="-option"]:first-child')
					.as('target')
					.click()
		} else if (options?.last) {
			cy.wrap(item).find('[class$="-option"]:last-child')
					.as('target')
					.click()
		}

		if (options?.verify !== false) {
			if (options?.selectedLabel) {
				cy.wrap(item).find('[class$="-singleValue"]')
						.should('have.html', options.selectedLabel)
			} else if (options?.selectedLabelContains) {
				cy.wrap(item).find('[class$="-singleValue"]')
						.should('contain', options.selectedLabelContains)
			} else if (options?.last || options?.first) {
				cy.wrap(item).find('[class$="-control"]')
						.click()
				cy.get('@target')
						.invoke('text')
						.then((label) => {
							cy.wrap(item).find('[class$="-singleValue"]')
									.should('contain', label)
						})
				cy.wrap(item).find('[class$="-control"]')
						.click()
			}
		}
	}

	if (Array.isArray(source)) {
		source.forEach((item) => changeSelect(item))
	} else {
		changeSelect(source)
	}

	return cy.wrap(source)
})

/**
 * clear ui.form.select selected option
 * @param source the previous subject
 * @param options clear options
 * @param options.verify verify the select cleared
 * @returns the previous subject
 */
Cypress.Commands.add('clearSelect', { prevSubject: true }, (source, options) => {
	// NOTE: The selects don't seem to work well with jquery selectors, hence the use of all cy commands here
	const clearSelect = (item: JQueryWithSelector<HTMLElement>) => {
		cy.wrap(item)
				.find('[class$="-indicatorContainer"]:first-child')
				.click()

		if (options?.verify !== false) {
			cy.wrap(item)
					.find('input[type="hidden"]')
					.should('not.have.value')
		}
	}

	if (Array.isArray(source)) {
		source.forEach((item) => clearSelect(item))
	} else {
		clearSelect(source)
	}

	return cy.wrap(source)
})

/**
 * clear ui.form.select selected option
 * @param source the previous subject
 * @returns the label element
 */
Cypress.Commands.add('selectLabel', { prevSubject: true }, (source) => cy.wrap(source).find('[class$="-singleValue"]'))

/**
 * expect select label to contain value
 * @param source the previous subject
 * @param value the value that to verify (partial match)
 * @returns the previous subject
 */
Cypress.Commands.add('selectLabelContains', { prevSubject: true }, (source, value) => {
	// NOTE: The selects don't seem to work well with jquery selectors, hence the use of all cy commands here
	const haveSelectedLabel = (item: JQueryWithSelector<HTMLElement>) => {
		cy.wrap(item)
				.find('[class$="-singleValue"]')
				.should('contain', value)
	}

	if (Array.isArray(source)) {
		source.forEach((item) => haveSelectedLabel(item))
	} else {
		haveSelectedLabel(source)
	}

	return cy.wrap(source)
})

/**
 * expect form to show validation error
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('hasFormValidationError', { prevSubject: true }, (source) => {
	cy.wrap(source).each((item) => {
		expect(item
				.find('[data-testid="ui.form.error.message"]'))
				.to.exist
	})

	return cy.wrap(source)
})

/**
 * expect form field to show validation error
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('hasValidationError', { prevSubject: true }, (source) => {
	cy.wrap(source).each((item) => {
		expect(item
				.closest('[data-testid="ui.form.field.field"]')
				.find('[data-testid="ui.form.error.message"]'))
				.to.exist
	})

	return cy.wrap(source)
})

/**
 * expect form field to not show a validation error
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('hasNoValidationError', { prevSubject: true }, (source) => {
	cy.wrap(source).each((item) => {
		expect(item).to.exist
		expect(item
				.closest('[data-testid="ui.form.field.field"]')
				.find('[data-testid="ui.form.error.message"]'))
				.to.not.exist
	})
	return cy.wrap(source)
})

export default {}