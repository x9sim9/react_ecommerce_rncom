import 'dotenv/config'
import { useField } from 'formik'
import { keys } from 'lodash'
import { DetailedHTMLProps, FC, FocusEvent, type InputHTMLAttributes, KeyboardEvent } from 'react'
import { type Country, Props as ReactPhoneNumberProps } from 'react-phone-number-input'
import PhoneInput, { Value as PhoneInputValue } from 'react-phone-number-input/min'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik } from '@/components/ui/form/field'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'
import type { MergeElement } from '@/components/ui/ui'

import { PhoneNumberPropsCommon } from './index'

export type FormikPhoneNumberPropsCommon = MergeElement<
	Omit<ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>, 'onChange'>,
	PhoneNumberPropsCommon
>

export type FormikPhoneNumberProps =
		FormikPhoneNumberPropsCommon &
		Omit<FormikFieldProps<FormikPhoneNumberPropsCommon>, 'children'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikPhoneNumberProps, ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>> => ({
	...omitPropsField,
	...omitPropsFormik,
})

/**
 * formik phone number form field
 * @param props FormikPhoneNumber props
 * @param props.defaultCountry the default country for phone number (defaults to COUNTRY_CODE)
 * @param props.name the name of the field
 * @param props.onBlur triggered on blur event
 * @param props.onChange triggered on change event
 * @param props.onKeyUp triggered on keyup event
 * @returns the phone number field
 */
export const FormikPhoneNumber: FC<FormikPhoneNumberProps> = ({
	defaultCountry = process.env.COUNTRY_CODE || 'GB',
	name,
	onBlur,
	onChange,
	onKeyUp,
	...props
}) => {
	const [fieldProps, meta, { setTouched, setValue }] = useField({ name })
	return (
		<FormikField<FormikPhoneNumberProps> name={name} onBlur={onBlur} onChange={onChange} onKeyUp={onKeyUp} {...sanitizeProps(props)}>
			{({ className }) => (
				<PhoneInput
					className={className}
					defaultCountry={defaultCountry as Country}
					id={`input-${name}`}
					international
					name={name}
					onBlur={(e: FocusEvent<HTMLInputElement>) => {
						setTouched(true)
						onBlur && onBlur(e)
					}}
					onChange={(value: PhoneInputValue) => {
						setValue(value)
						onChange && onChange(value)
					}}
					onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
									// @ts-expect-error Bug with target definition
						setValue(e.target.value)
						onKeyUp && onKeyUp(e)
					}}
					value={fieldProps.value}
					{...sanitizeProps(fieldProps, ['className', 'onKeyUp', 'onChange', 'onBlur', ...keys(omitProps())] as const)}
					{...sanitizeProps(props, ['className', 'onKeyUp', 'onChange', 'onBlur', ...keys(omitProps())] as const)}
				/>
			)}
		</FormikField>
	)
}


FormikPhoneNumber.displayName = 'Form.PhoneNumber.FormikPhoneNumber'

export default FormikPhoneNumber