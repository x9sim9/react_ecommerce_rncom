import { FieldAttributes } from 'formik'
import { map } from 'lodash'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'
import { Option, OptionPropsFormik } from '@/components/ui/form/option'

import { CheckboxGroupPropsCommon } from './index'

export type FormikCheckboxGroupPropsCommon = CheckboxGroupPropsCommon &
		FieldAttributes<object>

export type FormikCheckboxGroupProps =
		FormikCheckboxGroupPropsCommon &
		Omit<FormikFieldProps<FormikCheckboxGroupPropsCommon>, 'children'>

/**
 * formik checkbox group form field
 * @param props FormikCheckboxGroup props
 * @param props.gridProps props for checkbox grid
 * @param props.options checkbox options
 * @returns the checkbox group field
 */
export const FormikCheckboxGroup: FC<FormikCheckboxGroupProps> = ({
	gridProps,
	options,
	...props
}) => (
	<FormikField<FormikCheckboxGroupProps> fieldType="checkbox" {...{
		...props as Omit<FormikFieldProps<FormikCheckboxGroupProps>, 'fieldType'>,
	}}>
		{({ className, errorMessage }) => (
			<Grid gap="small" size="normal" {...sanitizeProps(gridProps)}>
				{map(options, (value: string, label: string) => (
					<Option
						className={className}
						errorMessage={errorMessage}
						key={value}
						label={label}
						type="formik"
						value={value}
						{...{ fieldType: 'checkbox', ...sanitizeProps(props, ['value'] as const) } as OptionPropsFormik}
					/>
				))}
			</Grid>
		)}
	</FormikField>
)

FormikCheckboxGroup.displayName = 'Form.CheckboxGroup.FormikCheckboxGroup'

export default FormikCheckboxGroup