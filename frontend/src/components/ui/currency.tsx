'use client'

import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { useFormat } from '@/helpers/translation'

import type { MergeElement } from '@/components/ui/ui'

export type CurrencyProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {
		className?: string
		currency?: string
		value: number
	} & (
		{
			tax: boolean | number
			taxValue?: boolean
		}
		|
		{
			tax?: false,
			taxValue?: never
		})>


/**
 * Format value as currency
 * @param f next intl formatter
 * @param props currency props
 * @param props.currency the currency format (defaults to NEXT_PUBLIC_CURRENCY)
 * @param props.tax the tax multiplier value, or true to use NEXT_PUBLIC_TAX, or false to ignore tax
 * @param props.taxValue true returns the tax amount, false returns the amount
 * @param props.value the currency value
 * @returns the formatted currency value
 */
export const currency = (f: ReturnType<typeof useFormat>, { currency = process.env.NEXT_PUBLIC_CURRENCY || 'GBP', tax = false, taxValue = false, value }: CurrencyProps) => {
	tax = tax === true ? +(process.env.NEXT_PUBLIC_TAX || 0) : tax || 1

	value = taxValue
		? (value * tax) - value
		: (value * tax)

	return f.number(value, { currency, style: 'currency' })
}

/**
 * Use the next-intl locale to format currency
 * @param props currency params
 * @param props.currency the currency format (defaults to NEXT_PUBLIC_CURRENCY)
 * @param props.tax the tax multiplier value, or true to use NEXT_PUBLIC_TAX, or false to ignore tax
 * @param props.taxValue true returns the tax amount, false returns the amount
 * @param props.value the currency value
 * @returns the formatted currency value
 */
export const useCurrency = (props: CurrencyProps) => {
	const f = useFormat()

	return currency(f, props)
}

/**
 * Format value as currency
 * @param props Currency propd
 * @param props.currency the currency format (defaults to NEXT_PUBLIC_CURRENCY)
 * @param props.tax the tax multiplier value, or true to use NEXT_PUBLIC_TAX, or false to ignore tax
 * @param props.taxValue true returns the tax amount, false returns the amount
 * @param props.value the currency value
 * @returns the formatted currency value
 */
export const Currency: FC<CurrencyProps> = ({ currency = process.env.CURRENCY || 'GBP', tax = false, taxValue = false, value, ...props }) => (
	<span {...sanitizeProps(props)}>
		{useCurrency({ currency, tax, taxValue, value })}
	</span>
)

Currency.displayName = 'Currency'

export default Currency
