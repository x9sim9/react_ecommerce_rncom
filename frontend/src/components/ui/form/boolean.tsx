import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Checkbox, type CheckboxProps } from './checkbox'
import { RadioGroup, type RadioGroupProps } from './radio_group'

export type BooleanPropsCheckbox = {
	field?: 'checkbox'
} & CheckboxProps

export type BooleanPropsRadio = {
	field?: 'radio'
	label?: never
} & Omit<RadioGroupProps, 'options'>

export type BooleanProps = BooleanPropsCheckbox | BooleanPropsRadio

/**
 * boolean form field
 * @param props Boolean props
 * @param props.field the field type
 * @returns the boolean field
 */
export const Boolean: FC<BooleanProps> = ({ field = 'checkbox', ...props }) => (
	<>
		{field === 'checkbox' && <Checkbox {...(sanitizeProps(props) as CheckboxProps)} />}
		{field === 'radio' && (
			<RadioGroup
				{...{ options: { No: false, Yes: true }, ...sanitizeProps(props) } as RadioGroupProps}
			/>
		)}
	</>
)

export default Boolean
