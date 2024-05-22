import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import {
	DefaultBoxSize,
	defaultBoxSizes,
	Field,
	FieldCommonProps,
	FieldCommonPropsPlaceHolder,
	FieldProps,
	FieldPropsShared,
	getDefaultStyles,
	type StyleElement,
} from '@/components/ui/form/field'
import { Breakpoints, parseUi } from '@/components/ui/ui'

import { FormikText, FormikTextProps } from './formik_text'
import { HtmlText, HtmlTextProps } from './html_text'

export type TextPropsCommon =
		{
			boxSize?: Breakpoints<DefaultBoxSize>
			field?: 'password' | 'text'
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type TextPropsShared = Omit<FieldProps, 'children' | 'type'> &
		TextPropsCommon

export type TextPropsFormik =
		{
			type?: 'formik'
		} &
		FormikTextProps & TextPropsShared

export type TextPropsHtml =
		{
			type?: 'html'
		} &
		HtmlTextProps & TextPropsShared

export type TextProps = TextPropsFormik | TextPropsHtml

/**
 * text form field
 * @param props Text props
 * @param props.boxSize text field size
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for textarea
 * @param props.styleProfile profile for styles
 * @param props.type the text field type
 * @returns the text field
 */
export const Text: FC<TextProps> = ({
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
		name: 'Form.Text',
		styles: {
			boxSize: { options: defaultBoxSizes, selected: boxSize },
		},
	})

	return (
		<Field
			boxSize={boxSize} hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (<FormikText {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikTextProps} />),
				html: (<HtmlText {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlTextProps} />),
			}[type]
			)}
		</Field>
	)
}

Text.displayName = 'Form.Text'

export default Text