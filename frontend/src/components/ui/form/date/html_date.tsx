import { keys } from 'lodash'
import { FC } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { sanitizeProps } from '@/helpers/component'
import { OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml } from '@/components/ui/form/field'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'

import { DatePropsCommon, omitPropsShared, parseDate } from './index'

export type HtmlDateProps =
		DatePropsCommon &
		Omit<ReactDatePickerProps, 'maxDate' | 'minDate' | 'onChange'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlDateProps, ReactDatePickerProps> => ({
	...omitPropsField,
	...omitPropsHtml,
	...omitPropsShared,
})

/**
 * html date form field
 * @param props HtmlDate props
 * @param props.format date format
 * @param props.initialValue initial value of date
 * @param props.maxDate max date
 * @param props.minDate min date
 * @returns the date field
 */
export const HtmlDate: FC<HtmlDateProps> = ({
	format = 'date', initialValue, maxDate,
	minDate, ...props
}) => {
	initialValue = initialValue ? parseDate(initialValue) : initialValue

	return (
		<HtmlField<HtmlDateProps> {...sanitizeProps(props) as HtmlFieldProps<HtmlDateProps>}>
			{({ className }) => (
				<DatePicker
					{...(format === 'datetime' ? { showTimeSelect: true } : {})}
					calendarStartDay={1}
					className={className}
					dateFormat={
						{
							date: 'dd/MM/yyyy',
							datetime: 'dd/MM/yyyy HH:ii',
						}[format]
					}
					dropdownMode="select"
					maxDate={(maxDate && parseDate(maxDate)) as ReactDatePickerProps['maxDate']}
					minDate={(minDate && parseDate(minDate)) as ReactDatePickerProps['minDate']}
					selected={initialValue as Date | undefined}
					showMonthDropdown

					showYearDropdown
					{...sanitizeProps(props, ['minDate', 'maxDate', 'className', 'selected', ...keys(omitProps())] as const) as Omit<ReactDatePickerProps, 'maxDate' | 'minDate'>}
				/>
			)}
		</HtmlField>
	)
}

HtmlDate.displayName = 'Form.Date.HtmlDate'

export default HtmlDate