// eslint-disable-next-line filename-rules/match
import { locales } from '@/../messages'
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Formats } from 'use-intl'

// https://devhints.io/wip/intl-datetime
export const formats: Partial<Formats> = {
	dateTime: {
		date: {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		},
		orderDate: {
			day: 'numeric',
			hour: '2-digit',
			hourCycle: 'h12',
			minute: '2-digit',
			month: 'short',
			weekday: 'long',
			year: 'numeric',
		},
	},
}

export default getRequestConfig(async ({ locale }) => {
	// Check that the incoming `locale` parameter is valid
	// @ts-expect-error From NextJS Docs
	if (!locales.includes(locale as object)) notFound()

	const file = await import(`../messages/${locale}.json`).catch(async () => await import('./translations'))

	return {
		formats,
		messages: file.default,
	}
})