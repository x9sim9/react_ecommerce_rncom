import { keys } from 'lodash'
import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'
import { Props as ReactPhoneNumberProps } from 'react-phone-number-input'

import { sanitizeProps } from '@/helpers/component'

import {
	DefaultBoxSize, defaultBoxSizes, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps,
	FieldPropsShared, getDefaultStyles, type StyleElement,
} from '@/components/ui/form/field'
import { omitProps } from '@/components/ui/form/textarea/html_textarea'
import { Breakpoints, parseUi } from '@/components/ui/ui'

import { FormikPhoneNumber, FormikPhoneNumberProps } from './formik_phone_number'
import { HtmlPhoneNumber, HtmlPhoneNumberProps } from './html_phone_number'

export type PhoneNumberPropsCommon =
		{
			boxSize?: Breakpoints<DefaultBoxSize>,
			onChange?: ReactPhoneNumberProps<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>['onChange']
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type PhoneNumberPropsShared = Omit<FieldProps, 'children' | 'type'> &
		PhoneNumberPropsCommon

export type PhoneNumberPropsFormik =
		{
			type?: 'formik'
		} &
		FormikPhoneNumberProps & PhoneNumberPropsShared

export type PhoneNumberPropsHtml =
		{
			type?: 'html'
		} &
		HtmlPhoneNumberProps & PhoneNumberPropsShared

export type PhoneNumberProps = PhoneNumberPropsFormik | PhoneNumberPropsHtml

/**
 * phone number form field
 * @param props PhoneNumber props
 * @param props.boxSize phone number size
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for textarea
 * @param props.styleProfile profile for styles
 * @param props.type the phone number field type
 * @returns the phone number field
 */
export const PhoneNumber: FC<PhoneNumberProps> = ({
	boxSize = 'full', children, className, hideValidation = false,
	ignoreStyles, styleProfile = 'default', type = 'formik',
	...props
}) => {
	const ui = parseUi({
		className: getDefaultStyles({ className, ignoreStyles, styleProfile }),
		name: 'Form.PhoneNumber',
		styles: {
			boxSize: { options: defaultBoxSizes, selected: boxSize },
		},
	})

	return (
		<Field
			boxSize={boxSize} hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (<FormikPhoneNumber {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation}
					setIsHidden={setIsHidden} {...sanitizeProps(props, [...keys(omitProps())] as const) as FormikPhoneNumberProps} />),
				html: (<HtmlPhoneNumber {...ui.attributes} boxSize={boxSize} className={ui.className}
					hideValidation={hideValidation} {...sanitizeProps(props, [...keys(omitProps())] as const) as HtmlPhoneNumberProps} />),
			}[type]
			)}
		</Field>
	)
}

PhoneNumber.displayName = 'Form.PhoneNumber'

export default PhoneNumber