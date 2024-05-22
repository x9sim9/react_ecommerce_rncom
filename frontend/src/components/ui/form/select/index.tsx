import { FC, type ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import {
	DefaultBoxSize, defaultBoxSizes, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps,
	FieldPropsShared, getDefaultStyles, type StyleElement,
} from '@/components/ui/form/field'
import { Breakpoints, parseUi } from '@/components/ui/ui'

import { FormikSelect, FormikSelectProps } from './formik_select'
import { HtmlSelect, HtmlSelectProps } from './html_select'

export const omitPropsShared = {
	children: null,
	multiselect: false,
	options: { one: 'two' },
}

export type SelectPropsCommon =
		{
			boxSize?: Breakpoints<DefaultBoxSize>
			children?: ReactNode
			multiselect?: boolean
			options: { [key: number | string]: boolean | null | number | string | undefined }
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type SelectPropsShared = Omit<FieldProps, 'children' | 'type'> &
		SelectPropsCommon

export type SelectPropsFormik =
		{
			type?: 'formik'
		} &
		FormikSelectProps & SelectPropsShared

export type SelectPropsHtml =
		{
			type?: 'html'
		} &
		HtmlSelectProps & SelectPropsShared

export type SelectProps = SelectPropsFormik | SelectPropsHtml

/**
 * formik select form field
 * @param props Select props
 * @param props.boxSize the field size
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for textarea
 * @param props.styleProfile profile for styles
 * @param props.type the select field type
 * @returns the select field
 */
export const Select: FC<SelectProps> = ({
	boxSize = 'full', children, className, hideValidation = false,
	ignoreStyles, styleProfile = 'default', type = 'formik',
	...props
}) => {
	const ui = parseUi({
		className: getDefaultStyles({ className, ignoreStyles, styleProfile }),
		name: 'Form.Select',
		styles: {
			boxSize: { options: defaultBoxSizes, selected: boxSize },
		},
	})

	return (
		<Field
			boxSize={boxSize} hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => (
				{
					formik: (<FormikSelect {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikSelectProps} />),
					html: (<HtmlSelect {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlSelectProps} />),
				}[type]
			)}
		</Field>
	)
}

Select.displayName = 'Form.Select'

export default Select