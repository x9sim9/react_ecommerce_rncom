import { defineConfig } from 'cypress'
import 'dotenv/config'

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL.replace(/\/$/, '') : 'http://127.0.0.1:3021'
const defaultLocale = process.env.DEFAULT_LOCALE || 'en-GB'

export default defineConfig({
	// chromeWebSecurity: false, // https://github.com/cypress-io/cypress/issues/27501
	component: {
		devServer: {
			bundler: 'webpack',
			framework: 'next',
		},
	},
	e2e: {
		baseUrl: `${baseUrl}/${defaultLocale}`,
		excludeSpecPattern: ['**/index.ts'],
		retries: {
			openMode: 0,
			runMode: 3,
		},
		scrollBehavior: 'center',
		setupNodeEvents(on, config) {

		},
		viewportHeight: 1000,
	},
	env: {
		// NODE_ENV: 'development',
		...process.env,
	},

})
