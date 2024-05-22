import { forEach } from 'lodash'

import { app } from './app'
import { component } from './component'

export const defaultLocale = process.env.DEFAULT_LOCALE || 'en'

export type Locale = {
	app: typeof app,
	component: typeof component
}

const replaceValuesWithKeys = (target: object, path?: string) => {
	forEach(target, (value, key) => {
		if (typeof value === 'object') {
			replaceValuesWithKeys(value, `${path}.${key}`)
		} else {
			`${path}.${key}`
		}
	})
}


export const locale: Locale = {
	app: (process.env.NEXT_PUBLIC_SHOW_TRANSLATION_KEYS ? replaceValuesWithKeys(app) : app) as typeof app,
	component: (process.env.NEXT_PUBLIC_SHOW_TRANSLATION_KEYS ? replaceValuesWithKeys(component) : component) as typeof component,
}

/**
 * get locale as JSON
 * @returns locale json
 */
export const asJson = () => JSON.stringify(locale, null, 2)


export default locale