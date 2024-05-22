export type DebugFn = (label: string, enabled: true) => void

/**
 * pause execution of test with log message when enabled
 * @param label the label to show when paused
 * @param enabled if the function should pause the tests
 */
export const debug: DebugFn = (label, enabled) => {
	if (enabled) {
		cy.log(`Debug: ${label}`)
		// eslint-disable-next-line cypress/no-pause
		cy.pause()
	}
}