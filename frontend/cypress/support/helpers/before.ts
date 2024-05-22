/* eslint-disable write-good-comments/write-good-comments, mocha/no-top-level-hooks, mocha/no-exports */
/**
 * A `before()` alternative that gets run when a failing test is retried.
 *
 * By default cypress `before()` isn't run when a test below it fails
 * and is retried. Because we use `before()` as a place to setup state
 * before running assertions inside `it()` this means we can't make use
 * of cypress retry functionality to make our suites more reliable.
 *
 * https://github.com/cypress-io/cypress/issues/19458
 * https://stackoverflow.com/questions/71285827/cypress-e2e-before-hook-not-working-on-retries
 * @param fn the before function
 */
export const retryableBefore = (fn) => {
	let shouldRun = true

	// we use beforeEach as cypress will run this on retry attempt
	// we just abort early if we detected that it's already run
	beforeEach(() => {
		if (!shouldRun) return
		shouldRun = false
		fn()
	})

	// When a test fails we flip the `shouldRun` flag back to true
	// so when cypress retries and runs the `beforeEach()` before
	// the test that failed, we'll run the `fn()` logic once more.
	Cypress.on('test:after:run', (result) => {
		if (result.state === 'failed' && result.currentRetry < result.retries) {
			shouldRun = true
		}
	})
}
/* eslint-enable write-good-comments/write-good-comments, mocha/no-top-level-hooks, mocha/no-exports */