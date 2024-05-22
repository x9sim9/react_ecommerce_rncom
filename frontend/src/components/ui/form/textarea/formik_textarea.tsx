import { Field, FieldAttributes } from 'formik'
import { keys } from 'lodash'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik } from '@/components/ui/form/field'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'

import { TextareaPropsCommon } from './index'

export type FormikTextareaPropsCommon = FieldAttributes<object> &
		TextareaPropsCommon

export type FormikTextareaProps =
		FormikTextareaPropsCommon &
		Omit<FormikFieldProps<FormikTextareaPropsCommon>, 'children'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikTextareaProps, FieldAttributes<object>> => ({
	...omitPropsField,
	...omitPropsFormik,
	placeholder: 'string',
	validationMessageAs: 'text',
})

/**
 * formik textarea form field
 * @param props FormikTextarea props
 * @returns the textarea field
 */
export const FormikTextarea: FC<FormikTextareaProps> = ({ ...props }) => (
	<FormikField<FormikTextareaProps> {...{
		...props,
	}}>
		{({ className }) => (
			<Field className={className} component="textarea" id={`input-${props.name}`} {...sanitizeProps(props, ['className', 'type', ...keys(omitProps())] as const)} />
		)}
	</FormikField>
)

FormikTextarea.displayName = 'Form.Textarea.FormikTextarea'

export default FormikTextarea