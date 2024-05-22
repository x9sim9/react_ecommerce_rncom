import { Field, FieldAttributes } from 'formik'
import { keys } from 'lodash'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik } from '@/components/ui/form/field'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'

import { TextPropsCommon } from './index'

export type FormikTextPropsCommon = FieldAttributes<object> &
		TextPropsCommon

export type FormikTextProps =
		FormikTextPropsCommon &
		Omit<FormikFieldProps<FormikTextPropsCommon>, 'children'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<Omit<FormikTextProps, 'placeholder'>, FieldAttributes<object>> => ({
	...omitPropsField,
	...omitPropsFormik,
})

/**
 * formik text form field
 * @param props FormikText props
 * @param props.field the field type
 * @returns the text field
 */
export const FormikText: FC<FormikTextProps> = ({
	field,
	...props
}) => (
	<FormikField<FormikTextProps> {...{
		...props,
	}}>
		{({ className }) => (
			<Field className={className} id={`input-${props.name}`} type={field} {...sanitizeProps(props, ['className', 'type', 'value', ...keys(omitProps())] as const)} />
		)}
	</FormikField>
)


FormikText.displayName = 'Form.Text.FormikText'

export default FormikText