import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import type { GridProps } from '@/components/ui'
import type { OptionProps } from '@/components/ui/form'
import { buildStyles, DefaultStyles, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps, FieldPropsShared, FieldStyles, type StyleElement } from '@/components/ui/form/field'
import { type MergeElement, parseUi } from '@/components/ui/ui'

import { FormikCheckboxGroup, FormikCheckboxGroupProps } from './formik_checkbox_group'
import { HtmlCheckboxGroup, HtmlCheckboxGroupProps } from './html_checkbox_group'

export type CheckboxGroupOptionProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type CheckboxGroupOptionLabelProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type CheckboxGroupPropsCommon =
		{
			gridProps?: GridProps
			optionLabelProps?: OptionProps['labelProps']
			options: { [key: number | string]: boolean | null | number | string | undefined }
			optionStyle?: OptionProps['optionStyle']
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type CheckboxGroupPropsShared = CheckboxGroupPropsCommon &
		Omit<FieldProps, 'children' | 'type'>

export type CheckboxGroupPropsFormik =
		{
			type?: 'formik'
		} &
		CheckboxGroupPropsShared & FormikCheckboxGroupProps

export type CheckboxGroupPropsHtml =
		{
			type?: 'html'
		} &
		CheckboxGroupPropsShared & HtmlCheckboxGroupProps

export type CheckboxGroupProps = CheckboxGroupPropsFormik | CheckboxGroupPropsHtml

/**
 * checkbox group form field
 * @param props CheckboxGroup props
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for checkbox group
 * @param props.styleProfile profile for styles
 * @param props.type the checkbox group field type
 * @returns the checkbox group field
 */
export const CheckboxGroup: FC<CheckboxGroupProps> = ({
	children, className, hideValidation = false, ignoreStyles,
	styleProfile = 'default', type = 'formik', ...props
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
		name: 'Form.CheckboxGroup',
	})

	return (
		<Field
			hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (
					<FormikCheckboxGroup {...ui.attributes} className={ui.className} hideValidation={hideValidation} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikCheckboxGroupProps} />),
				html: (<HtmlCheckboxGroup {...ui.attributes} className={ui.className} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlCheckboxGroupProps} />),
			}[type]
			)}
		</Field>
	)
}

CheckboxGroup.displayName = 'Form.CheckboxGroup'

export default CheckboxGroup