import { CheckIcon } from '@heroicons/react/16/solid'
import { Field, FieldAttributes, useField, useFormikContext } from 'formik'
import { FormikValues } from 'formik/dist/types'
import { get, keys } from 'lodash'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik, twMerge } from '@/components/ui/form/field'
import { Label } from '@/components/ui/form/label'

import { buttonDotClassName, buttonLabelClassName, buttonSpanClassName, fieldClassName, omitPropsShared, OptionPropsCommon } from './index'

export type FormikOptionPropsCommon = FieldAttributes<object> &
		OptionPropsCommon

export type FormikOptionPropsOption =
		{
			optionStyle?: 'option',
		} & FormikOptionPropsCommon

export type FormikOptionPropsButton =
		{
			optionStyle?: 'button' | 'buttonGroup',
		} & FormikOptionPropsCommon

export type FormikOptionProps = FormikOptionPropsButton | FormikOptionPropsOption

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikOptionProps, FieldAttributes<object>> => ({
	...omitPropsField,
	...omitPropsFormik,
	...omitPropsShared,
})

/**
 * formik form option
 * @param props FormikOption props
 * @param props.className html class names
 * @param props.errorMessage show error message text
 * @param props.fieldType the option type
 * @param props.hideValidation hide validation message
 * @param props.label the label for the option
 * @param props.labelProps the label props
 * @param props.name the name of the field
 * @param props.optionStyle the style of option
 * @param props.selected if the options selected
 * @param props.value the value of the option
 * @returns the option
 */
export const FormikOption: FC<FormikOptionProps> = ({
	className,
	errorMessage,
	fieldType,
	hideValidation,
	label,
	labelProps,
	name,
	optionStyle = 'option',
	selected,
	value,
	...props
}) => {
	const { isSubmitting, values } = useFormikContext()
	const [, meta, { setTouched }] = useField({ name })

	className = twMerge([
		fieldClassName(hideValidation, errorMessage, meta.touched),
		className,
	])

	selected = selected !== undefined
		? selected
		: name.match(/[^[]+\[[^\]]+\]/)
			? get(values, name.replace(/\[([^\]]+)\]/, '.$1'))
			: (values as FormikValues)[name]

	switch (fieldType) {
		case 'checkbox':
			selected = ![false, undefined].includes(Array.isArray(selected) ? selected.includes(`${value}`) : selected)
			break
		case 'radio':
			selected = ![false, undefined].includes(selected === value)
			break
	}

	return ({
		button: (
			<label className={buttonLabelClassName(fieldType, selected, errorMessage, hideValidation)} {...sanitizeProps(labelProps)}>
				<Field className="hidden" name={name} type={fieldType} value={`${value}`} {...sanitizeProps(props, [...keys(omitProps())] as const)} />
				{{
					checkbox: (
						<div className={buttonDotClassName(fieldType, selected, hideValidation)}>
							{selected ? <CheckIcon className="absolute w-[18px] text-cyan-500"/> : null}
						</div>
					),
					radio: (
						<div className={buttonDotClassName(fieldType, selected, hideValidation)}></div>
					),
				}[fieldType]}
				{label ? <span className={buttonSpanClassName(fieldType, selected, hideValidation)}>{label}</span> : null}
			</label>
		),
		buttonGroup: (
			<div className="inline-block border-r last:border-0" key={value + label}>
				<label
					className={`${
						selected ? 'bg-cyan-500 text-white' : 'bg-white text-gray-500'
					} cursor-pointer px-5 py-3`}
				>
					<Field className="hidden" name={name} type="radio" value={`${value}`}/>
					<span className="text-sm">{label}</span>
				</label>
			</div>
		),
		option: (
			label
				? (
						<Label text={label} type="option" {...sanitizeProps(labelProps) as Omit<FormikOptionPropsOption['labelProps'], 'htmlFor' | 'type'>}>
							<Field className={className} name={name} type={fieldType} value={`${value}`} {...sanitizeProps(props, [...keys(omitProps())] as const)} />
						</Label>
					)
				: (
						<Field className={className} name={name} type={fieldType} value={`${value}`} {...sanitizeProps(props, [...keys(omitProps())] as const)} />
					)
		),
	}[optionStyle]
	)
}

FormikOption.displayName = 'Form.Option.FormikOption'

export default FormikOption