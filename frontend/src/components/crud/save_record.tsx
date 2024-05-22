import type { FormikValues } from 'formik/dist/types'
import { map, transform } from 'lodash'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { type Maybe, Operation } from '@/graphql/schema/graphql'
import { sanitizeProps } from '@/helpers/component'
import { useTranslation } from '@/helpers/translation'
import { useRouter } from '@/navigation'
import type { Locale } from '@/translations'

import { Form, Grid } from '@/components/ui'
import { useFlash } from '@/components/ui/flash'
import type { CheckboxPropsFormik } from '@/components/ui/form/checkbox'
import type { DatePropsFormik } from '@/components/ui/form/date'
import type { FilePropsFormik } from '@/components/ui/form/file'
import { type FormPropsFormik } from '@/components/ui/form/form'
import type { PhoneNumberPropsFormik } from '@/components/ui/form/phone_number'
import type { TextPropsFormik } from '@/components/ui/form/text'
import { type TextareaPropsFormik } from '@/components/ui/form/textarea'

export type ChangePropsOnResult = {
	[key: string]: unknown
	errors?: Maybe<string[]>,
	result?: boolean | null | undefined,
	showError?: Maybe<boolean>,
}

type FormProps =
		({ field: 'checkbox' } & Omit<CheckboxPropsFormik, 'name'>) |
		({ field: 'date' } & Omit<DatePropsFormik, 'name'>) |
		({ field: 'file' } & Omit<FilePropsFormik, 'name'>) |
		({ field: 'phoneNumber' } & Omit<PhoneNumberPropsFormik, 'name'>) |
		({ field: 'text' } & Omit<TextPropsFormik, 'name'>) |
		({ field: 'textarea' } & Omit<TextareaPropsFormik, 'name'>)

export type SaveRecordProps<Fields extends FormikValues> = {
	children?: ReactNode
	createButtonLabel?: string
	messageFailed?: string
	messageSuccess?: string
	omitKeys?: (number | string | symbol)[]
	onCreate: (props: Omit<Fields, 'id'>) => Promise<ChangePropsOnResult>
	onUpdate: (props: Fields) => Promise<ChangePropsOnResult>
	operation: Omit<Lowercase<Operation>, 'delete'>
	record?: Fields
	recordMap?: { [key in keyof Omit<Fields, 'id'>]: FormProps }
	redirectPath: keyof Locale['app']
	updateButtonLabel?: string
	validationSchema: FormPropsFormik['validationSchema']
}

type FieldProps = { name: string } & FormProps

// subcomponent
/**
 * create form field
 * @param props FormField props
 * @param props.field the form field type
 * @returns the form field
 */
const FormField = ({ field, ...props }: FieldProps) => {
	switch (field) {
		case 'checkbox':
			return <Form.Checkbox {...sanitizeProps(props) as CheckboxPropsFormik} />
		case 'date':
			return <Form.Date {...sanitizeProps(props) as DatePropsFormik} />
		case 'file':
			return <Form.File {...sanitizeProps(props) as FilePropsFormik} />
		case 'phoneNumber':
			return <Form.PhoneNumber {...sanitizeProps(props) as PhoneNumberPropsFormik} />
		case 'text':
			return <Form.Text {...sanitizeProps(props) as TextPropsFormik} />
		case 'textarea':
			return <Form.Textarea {...sanitizeProps(props) as TextareaPropsFormik} />
		default:
			throw new Error('Unsupported field type')
	}
}

// main component
/**
 * create or update a record for a CRUD (Create, Read, Update, Delete) Model
 * @param props SaveRecord props
 * @param props.children children
 * @param props.createButtonLabel label for create button
 * @param props.messageFailed message when save fails
 * @param props.messageSuccess message when save succeeds
 * @param props.omitKeys omit keys for model
 * @param props.onCreate triggers on create event
 * @param props.onUpdate triggers on delete event
 * @param props.operation the operation type
 * @param props.record the record from the model
 * @param props.recordMap map record
 * @param props.redirectPath redirect path after save successful
 * @param props.updateButtonLabel label for update button
 * @param props.validationSchema validation schema for form
 * @returns the save form
 */
export const SaveRecord = <Fields extends FormikValues, >({
	children, createButtonLabel, messageFailed, messageSuccess, omitKeys = [], onCreate, onUpdate, operation, record, recordMap,
	redirectPath, updateButtonLabel, validationSchema,
}: SaveRecordProps<Fields>) => {
	// eslint-disable-next-line sonarjs/no-duplicate-string
	const t = useTranslation({ component: 'crud.change' })
	const { addMessage } = useFlash()
	const { push } = useRouter()

	if (!['create', 'update'].includes(operation as string)) {
		notFound()
	}

	if (operation === 'update' && !record?.id) {
		notFound()
	}

	omitKeys = ['id', '__typename', ...omitKeys]

	const submit: Form.OnSubmit<Fields> = async (values, _) => {
		let result

		switch (operation) {
			case 'create':
				result = await onCreate(values as Omit<Fields, 'id'>)
				break
			case 'update':
				result = await onUpdate(values as Fields)
				break
			default:
				throw new Error('Unsupported operation')
		}

		if (result.result) {
			addMessage({ id: 'crud.saveRecord.saveSuccess', message: messageSuccess || t('successMessage'), redirect: true, type: 'success' })
			// @ts-expect-error typescript cannot detect that the path is valid
			push(redirectPath)
		}
		addMessage({ id: 'crud.saveRecord.saveFailed', message: messageFailed || t('failedMessage'), type: 'danger' })
	}

	const initialValues = record
			|| transform(recordMap || {}, (values: { [key:string]: string }, value, key) => {
				values[key] = ''
			}) || {}

	return (
		<Form.Form<Fields> initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
			{({ touched }) => (
				<Grid gap="small">
					{map(record || recordMap, (field, key: keyof Fields) =>
						!omitKeys.includes(key)
							? recordMap && recordMap[key as string]
								? <FormField key={key.toString()} {...{ name: key, ...recordMap[key] as FormProps } as FieldProps} data-testid={`crud.saveRecord.field.${key.toString()}`}/>
								: <FormField key={key.toString()} {...{ field: 'text', name: key } as FieldProps} data-testid={`crud.saveRecord.field.${key.toString()}`}/>
							: null)}
					{children}
					<input data-testid="crud.saveRecord.recordId" name="id" type="hidden" value={record?.id}/>
					<Form.Submit data-testid="crud.saveRecord.saveButton" size="xl" width="full">{{
						create: createButtonLabel || t(operation as 'create' | 'update'),
						update: updateButtonLabel || t(operation as 'create' | 'update'),
					}[operation as 'create' | 'update']}</Form.Submit>
				</Grid>
			)}
		</Form.Form>
	)
}

export default SaveRecord