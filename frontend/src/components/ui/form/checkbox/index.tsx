import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { buildStyles, DefaultStyles, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps, FieldPropsShared, FieldStyles, type StyleElement } from '@/components/ui/form/field'
import type { OptionProps } from '@/components/ui/form/option'
import { type MergeElement, parseUi } from '@/components/ui/ui'

import { FormikCheckbox, FormikCheckboxProps } from './formik_checkbox'
import { HtmlCheckbox, HtmlCheckboxProps } from './html_checkbox'

export type CheckboxOptionProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type CheckboxOptionLabelProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type CheckboxPropsCommon =
		{
			label?: string
			optionLabelProps?: OptionProps['labelProps']
			optionStyle?: OptionProps['optionStyle']
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type CheckboxPropsShared = CheckboxPropsCommon &
		Omit<FieldProps, 'children' | 'type'>

export type CheckboxPropsFormik =
		{
			type?: 'formik'
		} &
		CheckboxPropsShared & FormikCheckboxProps

export type CheckboxPropsHtml =
		{
			type?: 'html'
		} &
		CheckboxPropsShared & HtmlCheckboxProps

export type CheckboxProps = CheckboxPropsFormik | CheckboxPropsHtml

/**
 * checkbox form field
 * @param props Checkbox props
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for checkbox
 * @param props.label checkbox label
 * @param props.styleProfile profile for styles
 * @param props.type the checkbox field type
 * @returns the checkbox field
 */
export const Checkbox: FC<CheckboxProps> = ({
	children, className, hideValidation = false, ignoreStyles,
	label, styleProfile = 'default', type = 'formik', ...props
}) => {
	const layout: FieldStyles<StyleElement['styleProfile']> = {
		default: '',
	}

	const styles: FieldStyles<StyleElement['styleProfile']> = {
		default: '',
	}

	const ui = parseUi({
		// styles: {
		// 	boxSize: { options: defaultBoxSizes, selected: boxSize },
		className: buildStyles<DefaultStyles, StyleElement['styleProfile']>({
			className,
			ignoreStyles,
			styleProfile,
			styles: { layout, styles },
		}),
		// },
		name: 'Form.Checkbox',
	})

	return (
		<Field
			hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (
					<FormikCheckbox {...ui.attributes} className={ui.className} hideValidation={hideValidation} label={label} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikCheckboxProps} />),
				html: (<HtmlCheckbox {...ui.attributes} className={ui.className} hideValidation={hideValidation} label={label} {...sanitizeProps(props) as HtmlCheckboxProps} />),
			}[type]
			)}
		</Field>
	)
}

Checkbox.displayName = 'Form.Checkbox'

export default Checkbox