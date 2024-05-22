import { useFormikContext } from 'formik'
import { FormikValues } from 'formik/dist/types'
import { map } from 'lodash'
import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'
import { Option, OptionPropsHtml } from '@/components/ui/form/option'
import { dependsParseValue } from '@/components/ui/form/validation'

import { CheckboxGroupPropsCommon } from './index'

export type HtmlCheckboxGroupProps =
		{
			initialValue?: number | string
		} &
		CheckboxGroupPropsCommon & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>

/**
 * html checkbox group form field
 * @param props HtmlCheckboxGroup props
 * @param props.gridProps props for checkbox grid
 * @param props.name field name
 * @param props.options checkbox options
 * @returns the checkbox group field
 */
export const HtmlCheckboxGroup: FC<HtmlCheckboxGroupProps> = ({
	gridProps,
	name,
	options,
	...props
}) => {
	const { isSubmitting, values } = useFormikContext()
	return (
		<HtmlField<HtmlCheckboxGroupProps> fieldType="checkbox" {...sanitizeProps(props) as Omit<HtmlFieldProps<HtmlCheckboxGroupProps>, 'fieldType'>} >
			{({ className }) => (
				<Grid gap="small" size="normal" {...sanitizeProps(gridProps)}>
					{map(options, (value: string, label: string) => {
						const selected = (values as FormikValues)[name]?.includes(dependsParseValue(value))
						return (
							<Option
								className={className}
								key={value}
								label={label}
								name={name}
								selected={selected}
								type="html"
								value={value}
								{...{ fieldType: 'checkbox', ...props } as Omit<OptionPropsHtml, 'name'>}
							/>
						)
					})}
				</Grid>
			)}
		</HtmlField>
	)
}


HtmlCheckboxGroup.displayName = 'Form.CheckboxGroup.HtmlCheckboxGroup'

export default HtmlCheckboxGroup