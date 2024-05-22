import { DetailedHTMLProps, FC, type HTMLAttributes, type ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { buildStyles, type FieldStyles, type StyleElement, type StylesProps } from '@/components/ui/form/field'
import type { MergeElement } from '@/components/ui/ui'

export type LabelPropsShared = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
	StyleElement
>

export type LabelPropsDefault = {
	htmlFor: string
	text?: never
	type?: 'default'
} & LabelPropsShared

export type LabelPropsOption = {
	htmlFor?: never
	text?: ReactNode
	type?: 'option'
} & LabelPropsShared

export type LabelProps = (LabelPropsDefault | LabelPropsOption) & StylesProps<'layout' | 'styles'>

/**
 * form field label or option label
 * @param props Label props
 * @param props.children when type = default: the label content, when type = option the checkbox or radio option
 * @param props.className html class names
 * @param props.htmlFor the field id for the label
 * @param props.ignoreStyles ignore styles for label
 * @param props.styleProfile profile for styles
 * @param props.text the label for the option
 * @param props.type the label type
 * @returns the field label or option label
 */
export const Label: FC<LabelProps> = ({
	children, className, htmlFor, ignoreStyles,
	styleProfile, text, type = 'default',
	...props
}) => {
	styleProfile = styleProfile || { default: 'label', option: 'option' }[type] as LabelProps['styleProfile']

	const layout: FieldStyles<LabelProps['styleProfile']> = {
		default: '',
		label: 'block pb-1',
		option: 'inline-block ml-3',
	}

	const styles: FieldStyles<LabelProps['styleProfile']> = {
		default: 'text-md font-medium text-gray-700',
		label: '',
		option: '',
	}

	className = buildStyles<'layout' | 'styles', LabelProps['styleProfile']>({
		className,
		ignoreStyles,
		styleProfile,
		styles: { layout, styles },
	})

	return ({
		default: (
			<label className={className} htmlFor={htmlFor} {...sanitizeProps(props)}>
				{children}
			</label>
		),
		option: (
			<label {...sanitizeProps(props)}>
				<div className="inline-block">{children}</div>
				<div className={className}>{text}</div>
			</label>
		),
	}[type]
	)
}

Label.displayName = 'Form.Label'

export default Label