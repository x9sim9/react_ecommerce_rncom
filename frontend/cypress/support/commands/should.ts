import { calculate, fromIsoString, Operator, toNumber } from '@support/helpers'

type Transform = [Operator, number | string]

declare global {
	namespace Cypress {
		interface Chainable {
			shouldBeValidIsoDate(): ReturnType<typeof cy.get>

			shouldBeValidOrderId(): ReturnType<typeof cy.get>

			shouldNumericallyEq(target: ReturnType<typeof cy.get>, { transformSource, transformTarget }?: { transformSource?: Transform | Transform[], transformTarget?: Transform | Transform[] }): void
		}
	}
}

/**
 * expect element(s) to have valid order id
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('shouldBeValidOrderId', { prevSubject: true }, (source) => {
	cy.wrap(source).each((item) => {
		expect(item.text()).to.match(/[A-Z0-9]{4}-[A-Z0-9]/)
	})

	return cy.wrap(source)
})

/**
 * expect element(s) to be valid date in iso format
 * @param source the previous subject
 * @returns the previous subject
 */
Cypress.Commands.add('shouldBeValidIsoDate', { prevSubject: true }, (source) => (
	cy.wrap(source).each((item) => {
		expect(fromIsoString(item.text().trim()).isValid).to.be.true
	})
))

/**
 * expect element(s) to numerically equal target
 * @param source the previous subject
 * @param target the target element to verify
 * @param options the options
 * @param options.transformSource change the value of the previous subject(s) (source) e.g. ['*', 10] = source * 10, e.g. ['+', 10] = source + 10
 * @param options.transformTarget change the value of the target element (target) e.g. ['/', 10] = target / 10, e.g. ['-', 10] = target - 10
 * @returns the previous subject
 */
Cypress.Commands.add('shouldNumericallyEq', { prevSubject: true }, (source, target, options) => {
	cy.wrap(source)
			.each((sourceItem) => {
				let sourceValue: number | string = toNumber(sourceItem.text())

				if (options?.transformSource) {
					options.transformSource = options.transformSource && Array.isArray(options.transformSource[0]) ? options.transformSource : [options.transformSource] as Transform[]

					(options.transformSource as Transform[]).forEach(([operator, value]) => {
						sourceValue = calculate(+sourceValue)(operator)(toNumber(value))
					})
				}

				target
						.each((targetItem) => {
							let targetValue: number | string = toNumber(targetItem.text())

							if (options?.transformTarget) {
								options.transformTarget = options.transformTarget && Array.isArray(options.transformTarget[0]) ? options.transformTarget : [options.transformTarget] as Transform[]

								(options.transformTarget as Transform[]).forEach(([operator, value]) => {
									targetValue = calculate(+targetValue)(operator)(toNumber(value))
								})
							}

							expect(+sourceValue).to.eq(+targetValue)
						})
			})

	return cy.wrap(source)
})

export default {}