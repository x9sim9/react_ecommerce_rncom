import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import type { GridProps } from '@/components/ui'
import type { OptionProps } from '@/components/ui/form'
import { buildStyles, DefaultStyles, Field, FieldCommonProps, FieldCommonPropsPlaceHolder, FieldProps, FieldPropsShared, FieldStyles, type StyleElement } from '@/components/ui/form/field'
import { type MergeElement, parseUi } from '@/components/ui/ui'

import { FormikRadioGroup, FormikRadioGroupProps } from './formik_radio_group'
import { HtmlRadioGroup, HtmlRadioGroupProps } from './html_radio_group'

export type RadioGroupOptionProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type RadioGroupOptionLabelProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type RadioGroupPropsCommon =
		{
			gridProps?: GridProps
			optionLabelProps?: OptionProps['labelProps']
			options: { [key: number | string]: boolean | null | number | string | undefined }
			optionStyle?: OptionProps['optionStyle']
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type RadioGroupPropsShared = Omit<FieldProps, 'children' | 'type'> &
		RadioGroupPropsCommon

export type RadioGroupPropsFormik =
		{
			type?: 'formik'
		} &
		FormikRadioGroupProps & RadioGroupPropsShared

export type RadioGroupPropsHtml =
		{
			type?: 'html'
		} &
		HtmlRadioGroupProps & RadioGroupPropsShared

export type RadioGroupProps = RadioGroupPropsFormik | RadioGroupPropsHtml

/**
 * radio group form field
 * @param props RadioGroup props
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for radio group
 * @param props.styleProfile profile for styles
 * @param props.type the radio group field type
 * @returns the radio group field
 */
export const RadioGroup: FC<RadioGroupProps> = ({
	children,
	className,
	hideValidation = false,
	ignoreStyles,
	styleProfile = 'default',
	type = 'formik',
	...props
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
		name: 'Form.RadioGroup',
	})

	return (
		<Field
			hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (
					<FormikRadioGroup {...ui.attributes} className={ui.className} hideValidation={hideValidation} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikRadioGroupProps} />),
				html: (<HtmlRadioGroup {...ui.attributes} className={ui.className} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlRadioGroupProps} />),
			}[type]
			)}
		</Field>
	)
}

RadioGroup.displayName = 'Form.RadioGroup'

export default RadioGroup