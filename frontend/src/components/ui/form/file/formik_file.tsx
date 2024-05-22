import { Field, FieldAttributes } from 'formik'
import { keys } from 'lodash'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsFormik } from '@/components/ui/form/field'
import { FormikField, type FormikFieldProps } from '@/components/ui/form/field/formik_field'

import { FilePropsCommon } from './index'

export type FormikFilePropsCommon = FieldAttributes<object> &
		FilePropsCommon

export type FormikFileProps =
		FormikFilePropsCommon &
		Omit<FormikFieldProps<FormikFilePropsCommon>, 'children'>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikFileProps, FieldAttributes<object>> => ({
	...omitPropsField,
	...omitPropsFormik,
	placeholder: 'string',
})

/**
 * formik file form field
 * @param props FormikFile props
 * @returns the file field
 */
export const FormikFile: FC<FormikFileProps> = ({ ...props }) => (
	<FormikField<FormikFileProps> {...{
		...props,
	}}>
		{({ className }) => (
			<Field className={className} id={`input-${props.name}`} type="file" {...sanitizeProps(props, ['className', 'type', ...keys(omitProps())] as const)} />
		)}
	</FormikField>
)

FormikFile.displayName = 'Form.File.FormikFile'

export default FormikFile