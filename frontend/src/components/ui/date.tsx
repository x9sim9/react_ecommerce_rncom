'use client'

import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'
import { type DateTimeFormatOptions } from 'use-intl'

import { sanitizeProps } from '@/helpers/component'
import { DateStamp, DateStampType, exportDate, fromIsoString, importDate, toIsoString } from '@/helpers/date'
import { getCookies } from '@/helpers/dom'
import { useFormat } from '@/helpers/translation'
import type { formats } from '@/i18n'

import type { MergeElement } from '@/components/ui/ui'

export type DateProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, {
		date: Date | DateStampType | string
		options: DateTimeFormatOptions | keyof typeof formats['dateTime'] | string
	}>

/**
 * Format date based on current locale (next-intl)
 * @param props Date props
 * @param props.date the date
 * @param props.options the next intl format options
 * @returns the formatted date
 */
export const DateComponent: FC<DateProps> = ({ date, options = 'date', ...props }) => {
	const f = useFormat()

	if (date instanceof DateStamp) {
		date = exportDate(date)
	} else if (typeof date === 'string') {
		date = exportDate(fromIsoString(date))
	}

	// During testing we convert all dates to ISO Strings bypassing locale
	return (
		<span {...sanitizeProps(props)}>
			{getCookies['Test'] === 'Cypress' ? toIsoString(importDate(date)) : f.dateTime(date, options)}
		</span>
	)
}

export default DateComponent