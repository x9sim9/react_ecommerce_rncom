import { useFormikContext } from 'formik'
import { FormikValues } from 'formik/dist/types'
import { map } from 'lodash'
import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'
import { Option, OptionPropsHtml } from '@/components/ui/form/option'
import { dependsParseValue } from '@/components/ui/form/validation'

import { RadioGroupPropsCommon } from './index'

export type HtmlRadioGroupProps =
		{
			initialValue?: number | string
		} &
		Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & RadioGroupPropsCommon

/**
 * html radio group form field
 * @param props HtmlRadioGroup props
 * @param props.gridProps the props for the options Grid
 * @param props.name the name of the options group
 * @param props.options the options for the option group
 * @returns the radio group field
 */
export const HtmlRadioGroup: FC<HtmlRadioGroupProps> = ({
	gridProps,
	name,
	options,
	...props
}) => {
	const { isSubmitting, values } = useFormikContext()
	return (
		<HtmlField<HtmlRadioGroupProps> fieldType="checkbox" {...sanitizeProps(props) as Omit<HtmlFieldProps<HtmlRadioGroupProps>, 'fieldType'>} >
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
								{...{ fieldType: 'radio', ...sanitizeProps(props, ['fieldType'] as const) } as Omit<OptionPropsHtml, 'name'>}
							/>
						)
					})}
				</Grid>
			)}
		</HtmlField>
	)
}


HtmlRadioGroup.displayName = 'Form.RadioGroup.HtmlRadioGroup'

export default HtmlRadioGroup