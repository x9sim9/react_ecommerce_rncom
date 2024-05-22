import { DateTime } from 'luxon'
import { FC } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'

import { sanitizeProps } from '@/helpers/component'
import { DateStamp, DateStampType, fromStringDate } from '@/helpers/date'

import {
	DefaultBoxSize, defaultBoxSizes, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps,
	FieldPropsShared, getDefaultStyles, type StyleElement,
} from '@/components/ui/form/field'
import { Breakpoints, parseUi } from '@/components/ui/ui'

import { FormikDate, FormikDateProps } from './formik_date'
import { HtmlDate, HtmlDateProps } from './html_date'

export const omitPropsShared = {
	format: 'date' as const,
	initialValue: 'string',
	placeholder: 'string',
}

export type DatePropsCommon =
		{
			boxSize?: Breakpoints<DefaultBoxSize>
			format?: 'date' | 'datetime'
			initialValue?: Date | DateStampType | string
			maxDate?: DateTime | ReactDatePickerProps['maxDate'] | string
			minDate?: DateTime | ReactDatePickerProps['minDate'] | string
			onChange?: ReactDatePickerProps['onChange'],
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type DatePropsShared = DatePropsCommon &
		Omit<FieldProps, 'children' | 'type'>

export type DatePropsFormik =
		{
			type?: 'formik'
		} &
		DatePropsShared & FormikDateProps

export type DatePropsHtml =
		{
			type?: 'html'
		} &
		DatePropsShared & HtmlDateProps

export type DateProps = DatePropsFormik | DatePropsHtml

/**
 * parse date
 * @param date the date
 * @returns the parsed date
 */
export const parseDate = (date: Date | DateStampType | string): Date | undefined =>
	(date
		? date instanceof Date
			? date
			: date instanceof DateStamp
				? date.toJSDate()
				: typeof date === 'string' && date.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)
					? fromStringDate(date).toJSDate()
					: null
		: null) as Date | undefined

/**
 * date form field
 * @param props FormDate props
 * @param props.boxSize date size
 * @param props.children field label
 * @param props.className html class names
 * @param props.format date format
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for textarea
 * @param props.styleProfile profile for styles
 * @param props.type the date field type
 * @returns the date field
 */
export const FormDate: FC<DateProps> = ({
	boxSize = 'full',
	children,
	className,
	format = 'date',
	hideValidation = false,
	ignoreStyles,
	styleProfile = 'default',
	type = 'formik',
	...props
}) => {
	const ui = parseUi({
		className: getDefaultStyles({ className, ignoreStyles, styleProfile }),
		name: 'Form.Date',
		styles: {
			boxSize: { options: defaultBoxSizes, selected: boxSize },
		},
	})

	return (
		<Field
			boxSize={boxSize} hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (<FormikDate {...ui.attributes} boxSize={boxSize} className={ui.className} format={format} hideValidation={hideValidation}
					setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikDateProps} />),
				html: (<HtmlDate {...ui.attributes} boxSize={boxSize} className={ui.className} format={format} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlDateProps} />),
			}[type]
			)}
		</Field>
	)
}

FormDate.displayName = 'Form.Date'

export default FormDate