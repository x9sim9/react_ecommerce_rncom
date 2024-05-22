import { FieldAttributes } from 'formik'
import { FC } from 'react'

import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'
import { Option, OptionPropsFormik } from '@/components/ui/form/option'

import { CheckboxPropsCommon } from './index'

export type FormikCheckboxPropsCommon = CheckboxPropsCommon &
		FieldAttributes<object>

export type FormikCheckboxProps =
		FormikCheckboxPropsCommon &
		Omit<FormikFieldProps<FormikCheckboxPropsCommon>, 'children'>

/**
 * formik checkbox form field
 * @param props FormikCheckbox props
 * @param props.label the checkbox label
 * @returns the checkbox field
 */
export const FormikCheckbox: FC<FormikCheckboxProps> = ({
	label,
	...props
}) => (
	<FormikField<FormikCheckboxProps> fieldType="checkbox" {...{
		...props as Omit<FormikFieldProps<FormikCheckboxProps>, 'fieldType'>,
	}}>
		{({ className, errorMessage }) => (
			<Option
				className={className}
				errorMessage={errorMessage}
				label={label}
				type="formik"
				{...{ fieldType: 'checkbox', ...props } as OptionPropsFormik}
			/>
		)}
	</FormikField>
)

FormikCheckbox.displayName = 'Form.Checkbox.FormikCheckbox'

export default FormikCheckbox