import { useField } from 'formik'
import { keys } from 'lodash'
import { FC, useMemo, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { sanitizeProps } from '@/helpers/component'
import { fromStringDate } from '@/helpers/date'
import { OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik } from '@/components/ui/form/field'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'

import { DatePropsCommon, omitPropsShared, parseDate } from './index'

export type FormikDatePropsCommon = DatePropsCommon &
		ReactDatePickerProps

export type FormikDateProps =
		FormikDatePropsCommon &
		Omit<FormikFieldProps<FormikDatePropsCommon>, 'children' | 'maxDate' | 'minDate' | 'onChange'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikDateProps, ReactDatePickerProps> => ({
	...omitPropsField,
	...omitPropsFormik,
	...omitPropsShared,
})

/**
 * formik date form field
 * @param props FormikDate props
 * @param props.format date format
 * @param props.maxDate max date
 * @param props.minDate min date
 * @param props.name the field name
 * @param props.onBlur triggered on blur event
 * @param props.onChange triggered on change event
 * @param props.onKeyDown triggered on key down event
 * @returns the date field
 */
export const FormikDate: FC<FormikDateProps> = ({
	format = 'date', maxDate, minDate,
	name, onBlur, onChange, onKeyDown,
	...props
}) => {
	const [fieldProps, meta, { setError, setTouched, setValue }] = useField({ name })
	const [changed, setChanged] = useState<boolean>()
	const [clearErrpr, setClearError] = useState<boolean>()

	useMemo(() => {
		if (
			!changed
				&& meta.initialValue === fieldProps.value
				&& typeof fieldProps.value === 'string'
				&& fieldProps.value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)
		) {
			setValue(fromStringDate(fieldProps.value).toJSDate())
			setChanged(true)
			setClearError(true)
		} else if (changed && clearErrpr) {
			setError(undefined)
			setClearError(false)
		}
	}, [fieldProps.value])

	return (
		<FormikField<FormikDateProps> name={name} onBlur={onBlur} onChange={onChange} onKeyDown={onKeyDown} {...sanitizeProps(props)}>
			{({ className }) => (
				<DatePicker
					id={`input-${name}`}
					name={name}
					todayButton="Today"
					{...(format === 'datetime' ? { showTimeSelect: true } : {})}
					calendarStartDay={1}
					className={className}
					dateFormat={
						{
							date: 'dd/MM/yyyy',
							datetime: 'dd/MM/yyyy HH:mm',
						}[format]
					}
					dropdownMode="select"
					maxDate={maxDate ? parseDate(maxDate) : null}
					minDate={minDate ? parseDate(minDate) : null}
					onBlur={(e) => {
						setTouched(true)
						onBlur && onBlur(e)
					}}
					onChange={(val, extra) => {
						setValue(val)
						setChanged(true)
						onChange && onChange(val, extra)
					}}
					onKeyDown={(val) => {
						setValue(val)
						setChanged(true)
						onKeyDown && onKeyDown(val)
					}}
					selected={fieldProps.value ? parseDate(fieldProps.value) : null}
					showMonthDropdown

					showYearDropdown
					{...sanitizeProps(fieldProps, ['name', 'onKeyDown', 'onChange', 'onBlur', 'minDate', 'maxDate', 'className', ...keys(omitProps())] as const)}
					{...sanitizeProps(props, ['name', 'onKeyDown', 'onChange', 'onBlur', 'minDate', 'maxDate', 'className', ...keys(omitProps())] as const)}
				/>
			)}
		</FormikField>
	)
}

FormikDate.displayName = 'Form.Date.FormikDate'

export default FormikDate