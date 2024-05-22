import { DetailedHTMLProps, Dispatch, type HTMLAttributes, ReactNode, SetStateAction, useState } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { HelpText, HelpTextProps, Label, LabelProps } from '@/components/ui/form'
import { ValidateDepends } from '@/components/ui/form/validation'
import { Grid } from '@/components/ui/grid'

import { twMerge } from './index'

export type FieldPropsShared = {
	containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	helpTextAbove?: string
	helpTextBelow?: string
	helpTextProps?: HelpTextProps,
	label?: ReactNode
	labelProps?: LabelProps,
	name?: string
}

export type FieldFormikPropsShared = {
	depends?: ValidateDepends | ValidateDepends[]
	errorMessage?: string
	setIsHidden?: (hidden: boolean) => void
}

export type FieldProps<T = object> = {
	children: (({ isHidden, setIsHidden }: { isHidden: boolean, setIsHidden: Dispatch<SetStateAction<boolean>> }) => ReactNode) | ReactNode
	type: 'formik' | 'html'
} & FieldPropsShared & T

/**
 * shared functionality for all form fields
 * @param props Field props
 * @param props.children field
 * @param props.containerProps props for container div
 * @param props.helpTextAbove help text shown above field
 * @param props.helpTextBelow help text shown below field
 * @param props.helpTextProps props for helptext
 * @param props.label field label
 * @param props.labelProps props for label
 * @param props.name field name
 * @param props.type the field type
 * @returns the form field
 */
export const Field = <T = object>({
	children,
	containerProps,
	helpTextAbove,
	helpTextBelow,
	helpTextProps,
	label,
	labelProps,
	name,
	type = 'formik',
}: FieldProps<T>) => {
	const [isHidden, setIsHidden] = useState<boolean>(false)

	return (
		<div className={twMerge([isHidden && 'hidden', labelProps?.className])} data-testid="ui.form.field.field">
			{label
				? <Label {...{
						htmlFor: type === 'formik' ? `input-${name}` : name,
						...sanitizeProps(labelProps, 'className'),
					} as LabelProps}>{label}</Label>
				: null}
			<Grid gap="xs" size="normal">
				{helpTextAbove ? <HelpText className="-mb-1" {...sanitizeProps(helpTextProps)}>{helpTextAbove}</HelpText> : null}
				{typeof children === 'function' ? children({ isHidden, setIsHidden }) : children}
				{helpTextBelow ? <HelpText {...sanitizeProps(helpTextProps)}>{helpTextBelow}</HelpText> : null}
			</Grid>
		</div>
	)
}

export default Field