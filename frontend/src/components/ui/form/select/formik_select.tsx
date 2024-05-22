import { useField, useFormikContext } from 'formik'
import { keys, map } from 'lodash'
import { FC } from 'react'
import Select, { Props as SelectProps } from 'react-select'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik } from '@/components/ui/form/field'
import { FormikField, type FormikFieldProps, Option } from '@/components/ui/form/field/formik_field'
import { submit } from '@/components/ui/form/form/formik_form'

import { omitPropsShared, SelectPropsCommon } from './index'

export type FormikSelectPropsCommon = Omit<SelectProps, 'isMulti' | 'options'> &
		SelectPropsCommon

export type FormikSelectProps =
		{
			onChangeSubmit?: boolean
		} &
		FormikSelectPropsCommon & Omit<FormikFieldProps<FormikSelectPropsCommon>, 'children'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikSelectProps, Omit<SelectProps, 'isMulti' | 'options'>> => ({
	...omitPropsField,
	...omitPropsFormik,
	...omitPropsShared,
	onChangeSubmit: false,
	validationMessageAs: 'text',
})

/**
 * formik select form field
 * @param props HtmlSelect props
 * @param props.multiselect select more than one value
 * @param props.name the field name
 * @param props.onChange triggered on change
 * @param props.onChangeSubmit submit form on change
 * @param props.options react-select options
 * @returns the select field
 */
export const FormikSelect: FC<FormikSelectProps> = ({
	multiselect,
	name,
	onChange,
	onChangeSubmit,
	options,
	...props
}) => {
	const formikProps = useFormikContext()
	const [aaa, meta, { setTouched, setValue }] = useField({ name })

	const selectOptions: SelectProps<Option, boolean>['options'] = map(options, (value, label) => ({ label, value }))

	return (
		<FormikField<FormikSelectProps> fieldType="select" name={name} options={options} {...sanitizeProps(props)}>
			{({ className, selectedOption }) => (
				<Select<Option, boolean>
					className={className}
					id={`input-${name}`}
					isMulti={multiselect}
					name={name}
					onChange={(newValue, actionMeta): void => {
						if (!Array.isArray(newValue)) {
							newValue = [newValue as Option]
						}
						const value = newValue.map((option) => option?.value)

						setValue(multiselect ? value : value[0])
						onChangeSubmit && submit(undefined, formikProps)
						onChange && onChange(value, actionMeta)
					}}
					options={selectOptions}
					value={selectedOption as Option | Option[]}
					{...sanitizeProps(props, [...keys(omitProps())] as const) as Omit<SelectProps, 'className' | 'classNames' | 'components' | 'defaultValue' | 'name' | 'options' | 'styles' | 'value'>}
				/>
			)}
		</FormikField>
	)
}

FormikSelect.displayName = 'Form.Select.FormikSelect'

export default FormikSelect