import { FormikValues } from 'formik/dist/types'

import { sanitizeProps } from '@/helpers/component'
import type { Empty } from '@/helpers/typescript'

import { FormikForm, FormikFormProps } from './formik_form'
import { HtmlForm, HtmlFormProps } from './html_form'

export type FormPropsCommon = Empty
export type FormPropsFormik<Value extends FormikValues = FormikValues> =
		{
			type?: 'formik'
		} &
		FormikFormProps<Value> & FormPropsCommon

export type FormPropsForm =
		{
			type: 'form'
		} &
		FormPropsCommon & HtmlFormProps

export type FormProps<Value extends FormikValues = FormikValues> = FormPropsForm | FormPropsFormik<Value>

export type OnSubmit<Value extends FormikValues = FormikValues> = FormProps<Value>['onSubmit']

/**
 * form
 * @param props Form props
 * @param props.children children
 * @param props.type the form type
 * @returns the form
 */
export const Form = <Value extends FormikValues = FormikValues>({ children, type = 'formik', ...props }: FormProps<Value>) => ({
	form: (<HtmlForm {...sanitizeProps(props) as FormPropsForm}>{children as FormPropsForm['children']}</HtmlForm>),
	formik: (<FormikForm<Value> {...sanitizeProps(props) as FormPropsFormik<Value>}>{children as FormikFormProps<Value>['children']}</FormikForm>),
}[type]
)

export default Form