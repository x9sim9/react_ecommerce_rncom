import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'
import { Option, OptionPropsHtml } from '@/components/ui/form/option'
import type { MergeElement } from '@/components/ui/ui'

import { CheckboxPropsCommon } from './index'

export type HtmlCheckboxProps = MergeElement<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		{
			initialValue?: number | string
		} & CheckboxPropsCommon>


/**
 * html checkbox form field
 * @param props HtmlCheckbox props
 * @param props.label the checkbox label
 * @returns the checkbox field
 */
export const HtmlCheckbox: FC<HtmlCheckboxProps> = ({
	label,
	...props
}) => (
	<HtmlField<HtmlCheckboxProps> fieldType="checkbox" {...sanitizeProps(props) as Omit<HtmlFieldProps<HtmlCheckboxProps>, 'fieldType'>} >
		{({ className }) => (
			<Option
				className={className}
				label={label}
				type="html"
				{...{ fieldType: 'checkbox', ...props } as OptionPropsHtml}
			/>
		)}
	</HtmlField>
)


HtmlCheckbox.displayName = 'Form.Checkbox.HtmlCheckbox'

export default HtmlCheckbox