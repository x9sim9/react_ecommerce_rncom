import { createTranslator, NamespaceKeys, NestedKeyOf, useFormatter, useMessages, useTranslations } from 'next-intl'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import en, { Locale } from '@/translations'

const NO_SELECTOR_PROVIDED = 'no selector provided'

export type LocaleType = NamespaceKeys<typeof en, NestedKeyOf<typeof en>>

export type GetServerTranslationProps = {
	app?: NamespaceKeys<typeof en['app'], NestedKeyOf<typeof en['app']>>
	component?: NamespaceKeys<typeof en['component'], NestedKeyOf<typeof en['component']>>
	locale: NamespaceKeys<typeof en, NestedKeyOf<typeof en>>
}

export type Bob<A extends keyof Locale['app']> = Locale['app'][A]

/**
 * Get the translation helper for Page or Component
 * @param props - getTranslation Props
 * @param props.app - The file path for the app page
 * @param props.component - The id for the component
 * @param props.locale - The current locale (from next-intl)
 * @returns the translation helper
 */
export const getTranslation = ({ app, component, locale }: GetServerTranslationProps): ReturnType<typeof getTranslations> => {
	unstable_setRequestLocale(locale)

	if (typeof app !== 'undefined') {
		return getTranslations({ locale, namespace: `app.${app}` })
	} else if (typeof component !== 'undefined') {
		return getTranslations({ locale, namespace: `component.${component}` })
	}

	throw new Error(NO_SELECTOR_PROVIDED)
}

export type UseTranslationProps = Omit<GetServerTranslationProps, 'locale'>

/**
 * Use the translation helper for Page or Component
 * @param props - Server Translation Props
 * @param props.app - The file path for the app page
 * @param props.component - The id for the component
 * @returns the translation helper
 */
export const useTranslation = (props?: UseTranslationProps): ReturnType<typeof useTranslations> => {
	let config = undefined

	if (typeof props?.app !== 'undefined') {
		config = `app.${props?.app}` as NamespaceKeys<typeof en, NestedKeyOf<typeof en>>
	} else if (typeof props?.component !== 'undefined') {
		config = `component.${props?.component}` as NamespaceKeys<typeof en, NestedKeyOf<typeof en>>
	}

	return useTranslations(config)
}

/**
 * Use the current locale file
 * @returns the locale file
 */
export const useLocale = () => useMessages()

/**
 * Get the current locale file
 * @param props getLocale Props
 * @param props.locale The current locale (from next-intl)
 * @returns the locale file
 */
export const getLocale = ({ locale }: { locale?: LocaleType }): Promise<typeof en> => getMessages({ locale }) as Promise<typeof en>

/**
 * Create an object
 * @param key object key
 * @param value object value
 * @returns the object
 */
export const createObject = (key: string, value: string) => ({ [key]: value })

export type Translate = GetServerTranslationProps

/**
 * Get the translation helper for Page or Component
 * @param props translateProps
 * @param props.app The file path for the app page
 * @param props.component The id for the component
 * @param props.locale The current locale (from next-intl)
 * @returns the translation helper
 */
export const translate = ({ app, component, locale }: GetServerTranslationProps): ReturnType<typeof createTranslator> => {
	let config = undefined

	if (typeof app !== 'undefined') {
		config = `app.${app}` as NamespaceKeys<typeof en, NestedKeyOf<typeof en>>
	} else if (typeof component !== 'undefined') {
		config = `component.${component}` as NamespaceKeys<typeof en, NestedKeyOf<typeof en>>
	} else {
		throw new Error(NO_SELECTOR_PROVIDED)
	}

	return createTranslator({ locale, namespace: config })
}

export const useFormat = useFormatter