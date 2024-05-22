import { languages, locales, type Locales } from '@/../messages'
import { forEach, set, transform } from 'lodash'
import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation'

import { translatePath } from '@/helpers/path'
import { locale as defaultLocale } from '@/translations'

export const localePrefix = 'always' // Default

type PathLocaleDefinition = {
	[key in Locales]: string
}

type PathDefinition = {
	[key in keyof typeof defaultLocale['app']]: PathLocaleDefinition
}

export const pathnames = {
	// Reads the app translation files and writes language routes for each locale
	...transform(defaultLocale['app'], (newPaths: PathDefinition, data, url: keyof typeof defaultLocale['app']) => {
		const newUrl = translatePath({ locale: defaultLocale, path: url }) as string

		forEach(locales, (locale: string) => {
			const currentLocale = languages[locale as Locales]

			if (!url.match(/^\/$/)) {
				set(newPaths, [newUrl, locale], translatePath({ locale: currentLocale as typeof defaultLocale, path: url }))
			}
		})
	}),
} satisfies Pathnames<typeof locales>

export const { getPathname, Link, permanentRedirect, redirect, usePathname, useRouter } =
		createLocalizedPathnamesNavigation({ localePrefix, locales, pathnames })