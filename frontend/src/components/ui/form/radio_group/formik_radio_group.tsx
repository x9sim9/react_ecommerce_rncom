import { FieldAttributes } from 'formik'
import { map } from 'lodash'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'
import { Option, OptionPropsFormik } from '@/components/ui/form/option'

import { RadioGroupPropsCommon } from './index'

export type FormikRadioGroupPropsCommon = FieldAttributes<object> &
		RadioGroupPropsCommon

export type FormikRadioGroupProps =
		FormikRadioGroupPropsCommon &
		Omit<FormikFieldProps<FormikRadioGroupPropsCommon>, 'children'>

/**
 * formik radio group form field
 * @param props FormikRadioGroup props
 * @param props.gridProps the props for the options Grid
 * @param props.hideValidation hide validation message
 * @param props.options the options for the option group
 * @param props.optionStyle the style for the options
 * @returns the radio group field
 */
export const FormikRadioGroup: FC<FormikRadioGroupProps> = ({
	gridProps,
	hideValidation,
	options,
	optionStyle,
	...props
}) => (
	<FormikField<FormikRadioGroupProps> fieldType="checkbox" {...{
		...props as Omit<FormikFieldProps<FormikRadioGroupProps>, 'fieldType'>,
	}}>
		{({ className, errorMessage }) => (
			<Grid className={optionStyle === 'buttonGroup' ? `${!hideValidation && errorMessage ? 'border-red-400' : 'border-gray-400'} w-fit overflow-hidden rounded-lg border py-[8px]` : ''}
				gap={optionStyle === 'buttonGroup' ? 'none' : 'small'}
				size={optionStyle === 'buttonGroup' ? 'flow' : 'row'}
				{...sanitizeProps(gridProps)}>
				{map(options, (value: string, label: string) => (
					<Option className={className} errorMessage={errorMessage} hideValidation={hideValidation} key={value} label={label} type="formik" value={value}
						{...{ fieldType: 'radio', optionStyle, ...sanitizeProps(props, ['value', 'fieldType'] as const) } as OptionPropsFormik}
					/>
				))}
			</Grid>
		)}
	</FormikField>
)

FormikRadioGroup.displayName = 'Form.RadioGroup.FormikRadioGroup'

export default FormikRadioGroup