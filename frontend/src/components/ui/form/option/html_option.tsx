import { keys } from 'lodash'
import { DetailedHTMLProps, FC, type InputHTMLAttributes, useState } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml, twMerge } from '@/components/ui/form/field'
import { Label } from '@/components/ui/form/label'
import type { MergeElement } from '@/components/ui/ui'

import { fieldClassName, omitPropsShared, OptionPropsCommon } from './index'

export type HtmlOptionPropsCommon = MergeElement<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	OptionPropsCommon
>

export type HtmlOptionPropsOption =
		{
			optionStyle?: 'option',
		} & HtmlOptionPropsCommon

export type HtmlOptionPropsButton =
		{
			optionStyle?: 'button',
		} & HtmlOptionPropsCommon

export type HtmlOptionProps = HtmlOptionPropsButton | HtmlOptionPropsOption

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlOptionProps, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> => ({
	...omitPropsField,
	...omitPropsHtml,
	...omitPropsShared,
})

/**
 * html form option
 * @param props HtmlOption props
 * @param props.className html class names
 * @param props.errorMessage show error message text
 * @param props.fieldType the option type
 * @param props.hideValidation hide validation message
 * @param props.label the label for the option
 * @param props.labelProps the label props
 * @param props.name the name of the field
 * @param props.optionStyle the style of option
 * @param props.value the value of the option
 * @returns the option
 */
export const HtmlOption: FC<HtmlOptionProps> = ({
	className,
	errorMessage,
	fieldType,
	hideValidation,
	label,
	labelProps,
	name,
	optionStyle = 'option',
	value,
	...props
}) => {
	const [selected, setSelected] = useState<boolean>(false)
	className = twMerge([
		fieldClassName(hideValidation, errorMessage, false),
		className,
	])

	return ({
		button: null,
		option: (
			label
				? (
						<Label text={label} type="option" {...sanitizeProps(labelProps) as Omit<HtmlOptionPropsOption['labelProps'], 'htmlFor' | 'type'>}>
							<input className={className} name={name} type={fieldType} value={value} {...sanitizeProps(props, [...keys(omitProps())] as const)} />
						</Label>
					)
				: (
						<input className={className} name={name} type={fieldType} value={value} {...sanitizeProps(props, [...keys(omitProps())] as const)} />
					)
		),
				// (
				// <label className={buttonLabelClassName(selected, errorMessage)} {...sanitizeProps(labelProps)}>
				// 	<input type="checkbox" name={name} className="hidden" {...sanitizeProps(props, [...keys(omitProps())] as const)} />
				// 	<div className={buttonDotClassName(selected)}></div>
				// 	{label && <span className={buttonSpanClassName(selected)}>{label}</span>}
				// </label>
				// ),
	}[optionStyle]
	)
}

HtmlOption.displayName = 'Form.Option.HtmlOption'

export default HtmlOption