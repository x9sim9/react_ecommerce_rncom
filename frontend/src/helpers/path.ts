import { camelCase, remove, startCase } from 'lodash'
import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { usePathname } from 'next/navigation'

import { locale as defaultLocale } from '@/translations'

/**
 * Get the current full url from the headers
 * @param props getPath props
 * @param props.headers headers function from next/headers
 * @returns the url
 */
export const getPath = async ({ headers }:{ headers: ReadonlyHeaders }) => headers.get('x-pathname') || ''

/**
 * convert an absolute url to a relative url
 * @param path the absolute url
 * @returns the relative url
 */
export const relativePath = (path: string) => remove(path.split('/'), (v, k) => k !== 1).join('/')

/**
 * Get the current url path from the headers
 * @param props getRelativePath props
 * @param props.headers headers function from next/headers
 * @returns the relative url path
 */
export const getRelativePath = async ({ headers }:{ headers: ReadonlyHeaders }) => relativePath(await getPath({ headers })).replace(/\./g, '') || '/'

export const isClientComponent = !!(
	(typeof window !== 'undefined'
				&& window.document && window.document.createElement)
)

/**
 * if server component
 * @returns if component is server component
 */
export const isServerComponent = () => !isClientComponent

/**
 * use the relative url path
 * @returns the relative url path
 */
export const useRelativePath = () => relativePath(usePathname())

/**
 * use file path (compatible with translation file path keys)
 * @returns compatible file path key
 */
export const usePathKey = () => useRelativePath().replace(/\.\.\./g, ',,,')

/**
 * get file path (compatible with translation file path keys)
 * @param props getPathKey props
 * @param props.headers headers function from next/headers
 * @returns compatible file path key
 */
export const getPathKey = async ({ headers }:{ headers: ReadonlyHeaders }) => (await getRelativePath({ headers })).replace(/\.\.\./g, ',,,')

/**
 * Apply next-intl translation to breadcrumbs
 * @param props translateBreadcrumbs props
 * @param props.capitalize capitalize the breadcrumbs (when generated from the path)
 * @param props.locale the current locale (from next-intl)
 * @param props.path the current path
 * @returns the translated breadcrumbs
 */
export const translateBreadcrumbs = ({ capitalize = false, locale, path }: { capitalize: boolean, locale: typeof defaultLocale, path: keyof typeof defaultLocale['app'] }): string[] => {
	const parts = path.split('/')

	let workingUrl: keyof typeof defaultLocale['app']
	const breadcrumbs: string[] = []
	breadcrumbs.push(locale.app['/'].breadcrumbTitle)

	if (!(parts.length === 1 && parts[0] === '')) {
		parts.map((part) => {
			workingUrl = `${workingUrl || ''}/${part !== undefined ? part : ''}` as keyof typeof defaultLocale['app']
			breadcrumbs.push(locale.app[workingUrl]?.breadcrumbTitle ? locale.app[workingUrl]?.breadcrumbTitle : (capitalize ? startCase(camelCase(part)) : part))
		})
	}

	return breadcrumbs
}

/**
 * Apply next-intl translation to url path
 * @param props translatePath props
 * @param props.locale the current locale (from next-intl)
 * @param props.path the current path
 * @returns the translated path
 */
export const translatePath = ({ locale, path }: { locale: typeof defaultLocale, path: keyof typeof defaultLocale['app'] }): keyof typeof defaultLocale['app'] => {
	const parts = path.split('/')
	parts.shift()

	let workingUrl: keyof typeof defaultLocale['app']
	let current = ''
	parts.map((part) => {
		workingUrl = `${workingUrl || ''}/${part !== undefined ? part : ''}` as keyof typeof defaultLocale['app']
		current = `${current}/${locale.app[workingUrl]?.urlName ? locale.app[workingUrl]?.urlName : part}`
	})

	return current.replace(/,,,/g, '...') as keyof typeof defaultLocale['app']
}