import { Form, Formik } from 'formik'
import { FormikConfig, type FormikHelpers, FormikProps, FormikValues } from 'formik/dist/types'
import { keys, set } from 'lodash'
import { ComponentProps, type FormEvent, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import type { FormPropsCommon } from '@/components/ui/form/form/index'
import type { MergeElement } from '@/components/ui/ui'

export type FormikFormPropsShared<Value = FormikValues> =
		MergeElement<
			Omit<FormikConfig<Value>, 'children'>,
			FormPropsCommon
		>

export type FormikFormProps<Value = FormikValues> =
		{
			children: ((props: FormikProps<Value>) => ReactNode) | ReactNode
			onSubmit: (values: Value, formikHelpers: FormikHelpers<Value>) => Promise<unknown> | unknown;
		} & FormikFormPropsShared

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<FormikFormProps<FormikValues>, FormikConfig<FormikValues>> => ({})

/**
 * submit form
 * @param e the form event
 * @param props submit props
 * @returns the submitted form
 */
export const submit = <Value, >(e: FormEvent<HTMLFormElement> | undefined, props: FormikProps<Value>) => {
	if (e) {
		// @ts-expect-error Submitter exists on nativeEvent
		const { name, value } = e.nativeEvent.submitter

		if (value) { // Adds the name of the submit button to formik values
			props.setFieldValue('submitFrom', set({}, name, value))
		} else {
			props.setFieldValue('submitFrom', set({}, name, true))
		}
		return props.handleSubmit(e)
	}

	props.setFieldValue('submitFrom', undefined)
	return props.submitForm()
}

/**
 * formik form
 * @param props FormikForm props
 * @param props.children children
 * @returns the form
 */
export const FormikForm = <Value extends FormikValues = FormikValues, ExtraProps = object>({
	children,
	...props
}: ExtraProps & FormikFormProps<Value>) => (
	<Formik<Value> {...sanitizeProps(props, ['children', ...keys(omitProps()) as keyof typeof omitProps] as const) as ComponentProps<typeof Formik<Value>>}>
		{(props) => <Form
			onSubmit={(e) => submit<Value>(e, props)}
		>{typeof children === 'function' ? children(props) : children}</Form>}
	</Formik>
)

FormikForm.displayName = 'Form.Form.FormikForm'

export default FormikForm