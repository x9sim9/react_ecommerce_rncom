import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import {
	DefaultBoxSize, defaultBoxSizes, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps,
	FieldPropsShared, getDefaultStyles, type StyleElement,
} from '@/components/ui/form/field'
import { Breakpoints, parseUi } from '@/components/ui/ui'

import { FormikTextarea, FormikTextareaProps } from './formik_textarea'
import { HtmlTextarea, HtmlTextareaProps } from './html_textarea'

export type TextareaPropsCommon =
		{
			boxSize?: Breakpoints<DefaultBoxSize>
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type TextareaPropsShared = Omit<FieldProps, 'children' | 'type'> &
		TextareaPropsCommon

export type TextareaPropsFormik =
		{
			type?: 'formik'
		} &
		FormikTextareaProps & TextareaPropsShared

export type TextareaPropsHtml =
		{
			type?: 'html'
		} &
		HtmlTextareaProps & TextareaPropsShared

export type TextareaProps = TextareaPropsFormik | TextareaPropsHtml

/**
 * textarea form field
 * @param props Textarea props
 * @param props.boxSize textarea size
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for textarea
 * @param props.styleProfile profile for styles
 * @param props.type the textarea field type
 * @returns the textarea field
 */
export const Textarea: FC<TextareaProps> = ({
	boxSize = 'full',
	children,
	className,
	hideValidation = false,
	ignoreStyles,
	styleProfile = 'default',
	type = 'formik',
	...props
}) => {
	const ui = parseUi({
		className: getDefaultStyles({ className, ignoreStyles, styleProfile }),
		name: 'Form.TextArea',
		styles: {
			boxSize: { options: defaultBoxSizes, selected: boxSize },
		},
	})

	return (
		<Field
			boxSize={boxSize} hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (
					<FormikTextarea {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikTextareaProps} />),
				html: (
					<HtmlTextarea {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlTextareaProps} />),
			}[type]
			)}
		</Field>
	)
}

Textarea.displayName = 'Form.Textarea'

export default Textarea