import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { buildStyles, type DefaultStyles, FieldCommonProps, type FieldStyles, type StyleElement } from '@/components/ui/form/field'
import { LabelProps } from '@/components/ui/form/label'
import { parseUi } from '@/components/ui/ui'

import { FormikOption, FormikOptionProps } from './formik_option'
import { HtmlOption, HtmlOptionProps } from './html_option'

export const omitPropsShared = {
	fieldType: 'checkbox' as const, optionStyle: 'button' as const, selected: true,
}

export type OptionPropsCommon =
		{
			fieldType: 'checkbox' | 'radio'
			label?: string
			labelProps: Omit<LabelProps, 'type'>
			selected?: boolean
		} &
		FieldCommonProps & StyleElement

export type OptionPropsShared = OptionPropsCommon

export type OptionPropsFormik =
		{
			type?: 'formik'
		} &
		FormikOptionProps & OptionPropsShared

export type OptionPropsHtml =
		{
			type?: 'html'
		} &
		HtmlOptionProps & OptionPropsShared

export type OptionProps = OptionPropsFormik | OptionPropsHtml

/**
 * tailwind classed for button dot
 * @param fieldType the field type
 * @param selected if the fields selected
 * @param hideValidation hide validation styling
 * @returns tailwind classes
 */
export const buttonDotClassName = (fieldType: OptionProps['fieldType'], selected: boolean, hideValidation?: boolean) =>
	fieldType === 'checkbox'
		? `${!hideValidation && selected ? 'bg-white' : 'bg-gray-200'} h-[18px] w-[19px] rounded-sm relative`
		: `${!hideValidation && selected ? 'bg-white' : 'bg-gray-200'} h-[20px] w-[20px]  rounded-[50%] relative
						${!hideValidation && selected ? 'before:opacity-100 before:scale-100' : 'before:opacity-0 before:scale-150'}
						before:absolute before:content-[""] before:top-[4px] before:left-[4px] before:w-[12px] before:h-[12px] before:bg-cyan-500 before:rounded-[50%]`

/**
 * tailwind classed for button label
 * @param fieldType the field type
 * @param selected if the fields selected
 * @param errorMessage if error message is visible
 * @param hideValidation hide validation styling
 * @returns tailwind classes
 */
export const buttonLabelClassName = (fieldType: OptionProps['fieldType'], selected: boolean, errorMessage: OptionProps['errorMessage'], hideValidation?: boolean) =>
	`  
		${!hideValidation && selected
		? 'bg-cyan-500 border-cyan-500'
		: `${!hideValidation && errorMessage
			? 'border-red-400'
			: 'border-gray-400'} bg-gray-50`}
		flex w-fit items-center justify-evenly m-0 mr-3 mb-3 rounded-md cursor-pointer py-2 px-3 border`

/**
 * tailwind classed for button
 * @param fieldType the field type
 * @param selected if the fields selected
 * @param hideValidation hide validation styling
 * @returns tailwind classes
 */
export const buttonSpanClassName = (fieldType: OptionProps['fieldType'], selected: boolean, hideValidation?: boolean) =>
	`${!hideValidation && selected ? 'text-white' : 'text-gray-500'} pl-2 text-sm`

/**
 * tailwind classed for field
 * @param hideValidation hide validation styling
 * @param errorMessage if error message is visible
 * @param touched if fields touched
 * @returns tailwind classes
 */
export const fieldClassName = (hideValidation: OptionProps['hideValidation'], errorMessage: OptionProps['errorMessage'], touched: boolean) =>
	!hideValidation && errorMessage
		? 'ring-red-500 text-red-600 border-red-500'
		: !hideValidation && touched
				? 'ring-green-500 text-green-600 border-green-300'
				: 'text-indigo-600 border-gray-300'


/**
 * form option
 * @param props Option props
 * @param props.className html class names
 * @param props.ignoreStyles ignore styles for field
 * @param props.styleProfile profile for styles
 * @param props.type the option type
 * @returns the option
 */
export const Option: FC<OptionProps> = ({
	className, ignoreStyles, styleProfile = 'default', type = 'formik',
	...props
}) => {
	const layout: FieldStyles<StyleElement['styleProfile']> = {
		default: 'h-4 w-4',
	}

	const styles: FieldStyles<StyleElement['styleProfile']> = {
		default: 'focus:ring-indigo-500',
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
		name: 'Form.Option',
	})

	return ({
		formik: (<FormikOption {...ui.attributes} className={ui.className} {...sanitizeProps(props) as FormikOptionProps} />),
		html: (<HtmlOption {...ui.attributes} className={ui.className} {...sanitizeProps(props) as HtmlOptionProps} />),
	}[type]
	)
}

Option.displayName = 'Form.Option'

export default Option