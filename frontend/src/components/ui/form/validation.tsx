/** Formatting library for yup that allows easier validation definitions for forms, returns yup validation schema */

import { FormikValues } from 'formik/dist/types'
import { forEach, intersection, pick } from 'lodash'
import { NamespaceKeys, NestedKeyOf } from 'next-intl'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { AnyObject, AnySchema, array, ArraySchema, date, DateSchema, number, NumberSchema, object, ObjectSchema, string, StringSchema } from 'yup'

import { DateStamp, DateStampType, fromStringDate, importDate, toStringDate } from '@/helpers/date'
import { translate } from '@/helpers/translation'

import List from '@/components/ui/list'

let currentLocale: NamespaceKeys<unknown, string>

/**
 * sets the current locale for the validation text
 * @param locale the current locale (next-intl)
 */
export const setLocale = (locale: NamespaceKeys<unknown, string>) => {
	currentLocale = locale
}


/**
 * Wrapper for next intl with default value for translations to allow validations to work independently of next-intl
 * @param key the translation key
 * @param defaultText the default text if no translation exists
 * @param values the values to replace in the translation text
 * @returns the translated text
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const t = (key: NamespaceKeys<any, NestedKeyOf<string>>, defaultText: string, values: { [key: string]: number | string } = {}): boolean | string => {
	if (currentLocale) {
		return translate({ component: 'ui.form.validation', locale: currentLocale })(key, values)
	}

	forEach(values, (value, key) => {
		defaultText = defaultText.replaceAll(`{${key}}`, value.toString())
	})

	return defaultText
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidationArraySchema = ArraySchema<any[] | undefined, AnyObject>
type ValidationObjectSchema = ObjectSchema<AnyObject>

const yup = { array, date, number, object, string }

export type FormValidationCriteria =
		| 'alphanumericExtra'
		| 'customerId'
		| 'emailAddress'
		| 'kitId'
		| 'orderId'
		| 'password'
		| 'sku'
		| 'trackingNumber'
		| 'zendeskTicketNumber'

export type YupSchema = AnySchema


export type ValidateDependsValue = boolean | null | number | string | undefined

export type ValidateDepends = {
	name: string
	value: ValidateDependsValue | ValidateDependsValue[]
}

export type ValidatePropsShared = {
	depends?: ValidateDepends | ValidateDepends[]
	label: string
	required?: boolean
}

export type ValidatePropsString<Values extends FormikValues = FormikValues> = {
	all?: never
	criteria?: FormValidationCriteria | FormValidationCriteria[]
	max?: number
	min?: number
	mustMatch?: keyof Values
	mustMatchLabel?: string
	type: 'string' | 'text' | 'textarea'
} & ValidatePropsShared

export type ValidatePropsNumber<Values extends FormikValues = FormikValues> = {
	all?: never
	criteria?: FormValidationCriteria | FormValidationCriteria[]
	max?: number
	min?: number
	mustMatch?: never
	mustMatchLabel?: never
	type: 'integer' | 'number'
} & ValidatePropsShared

export type ValidatePropsRadio = {
	all?: never
	criteria?: never
	max?: never
	min?: never
	mustMatch?: never
	mustMatchLabel?: never
	type: 'radio' | 'radiogroup' | 'select'
} & ValidatePropsShared

export type ValidatePropsCheckbox = {
	all?: boolean
	criteria?: never
	max?: number
	min?: number
	mustMatch?: never
	mustMatchLabel?: never
	type: 'checkbox' | 'multiselect'
} & ValidatePropsShared

export type ValidatePropsBoolean = {
	all?: never
	criteria?: never
	max?: never
	min?: never
	mustMatch?: never
	mustMatchLabel?: never
	type: 'boolean_checkbox' | 'boolean_radio' | 'boolean'
} & ValidatePropsShared

export type ValidatePropsDate = {
	all?: never
	criteria?: never
	max?: Date | DateStampType | string
	min?: Date | DateStampType | string
	mustMatch?: never
	mustMatchLabel?: never
	type: 'date'
} & ValidatePropsShared

export type ValidatePropsPhoneNumber = {
	all?: never
	criteria?: never
	max?: never
	min?: never
	mustMatch?: never
	mustMatchLabel?: never
	type: 'phoneNumber'
} & ValidatePropsShared

export type ValidatePropsFile = {
	all?: never
	criteria?: never
	max?: number
	min?: never
	mustMatch?: never
	mustMatchLabel?: never
	type: 'file'
} & ValidatePropsShared

export type ValidateProps<Values extends FormikValues = FormikValues> =
		| ValidatePropsBoolean
		| ValidatePropsCheckbox
		| ValidatePropsDate
		| ValidatePropsFile
		| ValidatePropsNumber
		| ValidatePropsPhoneNumber
		| ValidatePropsRadio
		| ValidatePropsString<Values>


export const validationCriterias = {
	alphanumericExtra: {
		// @ts-expect-error ignoring if key exists so library is not dependent next-intl
		message: t('criteria.alphanumericExtra', 'can only include letters, number, spaces and hyphens'),
		regex: /^[0-9a-z -]*$/i,
	},
	emailAddress: {
		// @ts-expect-error ignoring if key exists so library is not dependent next-intl
		message: t('criteria.emailAddress', 'must be a valid email address'),

		regex:
		// eslint-disable-next-line no-control-regex,regexp/no-dupe-characters-character-class
				/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\v\f\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\v\f\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\v\f\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\v\f\x0e-\x7f])+)\])/,
	},
	password: {
		message: (
			<>
				{/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */}
				{t('criteria.password.message', 'must be a secure password')}. <br/>
				<List gap="small">
					{/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */}
					<li>(8) {t('criteria.password.minLength', 'characters in Length')}</li>
					{/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */}
					<li>(1) {t('criteria.password.uppercase', 'Uppercase characters')}</li>
					{/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */}
					<li>(1) {t('criteria.password.lowercase', 'Lowercase character')}</li>
					{/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */}
					<li>(1) {t('criteria.password.number', 'Number')}</li>
					{/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */}
					<li>(1) {t('criteria.password.special', 'Symbol / Special Character')}</li>
				</List>
			</>
		),
		// eslint-disable-next-line regexp/no-empty-lookarounds-assertion
		regex: /(?=(.*\d))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
	},
	trackingNumber: {
		/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
		message: `${t('criteria.trackingNumber', 'must be a valid Tracking Number')} - XXXXXXXX`,
		regex: /^[A-Z0-9]{8}$/i
		,
	},
	zendeskTicketNumber: {
		/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
		message: t('criteria.zendeskTicket', 'must be a valid Zendesk Ticket Number'),
		regex: /^\d{2,6}$/,
	},
}

/**
 * Creates validation rules for field
 * @param props validationRules props
 * @param props.all if all options selected
 * @param props.criteria regex validation criteria
 * @param props.label the label for the field
 * @param props.max the max value or size for a field
 * @param props.min the min value or size for a field
 * @param props.mustMatch if field must match another field
 * @param props.mustMatchLabel the label for the other field that mustMatch
 * @param props.required if the field cannot be empty
 * @param props.type the field type
 * @param props.validation the yup schema field
 * @returns the yup validation schema
 */
const validationRules = <Values extends FormikValues = FormikValues>({
	all,
	criteria,
	label,
	max,
	min,
	mustMatch,
	mustMatchLabel,
	required = false,
	type = 'string',
	validation,
}: {
	validation: YupSchema
} & Omit<ValidateProps<Values>, 'depends'>) => {
	switch (type) {
		case 'number':
		case 'integer':
			if (type === 'integer') {
				/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
				validation = (validation as NumberSchema).integer(`${label} ${t('rules.integer', 'must be valid whole number')}`)
			}

			if (min) {
				/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
				validation = (validation as NumberSchema).min(min as number, `${label} ${t('rules.minNumber', 'must be a minimum value of {min}', { min: min.toString() })}`)
			}

			if (max) {
				/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
				validation = (validation as NumberSchema).max(max as number, `${label} ${t('rules.maxNumber', 'must be a maximum value of {max}', { max: max.toString() })}`)
			}

			if (mustMatch) {
				validation = (validation as NumberSchema).test(
						`matches-${String(mustMatch)}`,
						// @ts-expect-error incorrect type in 3rd party library
						mustMatchLabel
								// @ts-expect-error ignoring if key exists so library is not dependent next-intl
							? `"${label}" ${t('rules.doesNotMatch', 'does not match field')} "${mustMatchLabel}"`
								// @ts-expect-error ignoring if key exists so library is not dependent next-intl
							: t('rules.mustMatch', 'Must Match'),
						(value: string | undefined, { parent }: { parent: Values }) => +(value?.trim() || 0) === +parent[mustMatch]?.trim(),
				)
			}
			break
		case 'string':
		case 'text':
		case 'textarea':
			if (min) {
				/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
				validation = (validation as StringSchema).min(min as number, `${label} ${t('rules.minLength', 'must be a minimum of {min} characters', { min: min.toString() })}`)
			}

			if (max) {
				/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
				validation = (validation as StringSchema).max(max as number, `${label} ${t('rules.maxLength', 'must be a maximum of {max} characters', { max: max.toString() })}`)
			}

			if (criteria) {
				if (!Array.isArray(criteria)) {
					criteria = [criteria]
				}

				const regexMatches = Object.values(pick(validationCriterias, criteria))

				regexMatches.forEach((match) => {
					validation = (validation as StringSchema).matches(match.regex, {
						excludeEmptyString: !required,
						message: (
							<>
								{label} {match.message}
							</>
						),
					})
				})
			}

			if (mustMatch) {
				validation = (validation as StringSchema).test(
						`matches-${String(mustMatch)}`,
						// @ts-expect-error incorrect type in 3rd party library
						mustMatchLabel
								// @ts-expect-error ignoring if key exists so library is not dependent next-intl
							? `"${label}" ${t('rules.doesNotMatch', 'does not match field')} "${mustMatchLabel}"`
								// @ts-expect-error ignoring if key exists so library is not dependent next-intl
							: t('rules.mustMatch', 'Must Match'),
						(value: string | undefined, { parent }: { parent: Values }) => value?.trim().toUpperCase() === parent[mustMatch]?.trim().toUpperCase(),
				)
			}
			break
		case 'select':
		case 'radiogroup':
		case 'radio':
			break
		case 'multiselect':
		case 'checkbox':
			if (min) {
				if (all) {
					validation = (validation as ValidationArraySchema).min(
							min as number,
							/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
							`${t('rules.allSelected', 'All options must be selected for')} ${label}`,
					)
				} else {
					validation = (validation as ValidationArraySchema).min(
							min as number,
							/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
							`${t('rules.minSelected', 'Must select a minimum of {min} options for', { min: min.toString() })} ${label}`,
					)
				}
			}

			if (max) {
				validation = (validation as ValidationArraySchema).max(
						max as number,
						/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
						`${t('rules.maxSelected', 'Must select a maximum of {max} options for', { min: max.toString() })} ${label}`,
				)
			}
			break
		case 'boolean':
		case 'boolean_radio':
		case 'boolean_checkbox':
			break
		case 'date':
			if (min) {
				if (typeof min === 'string') {
					min = fromStringDate(min)
				}

				if (min instanceof DateStamp) {
					min = min.toJSDate()
				}

				validation = (validation as DateSchema).min(
						min,
						/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
						`${label} ${t('rules.minDate', 'must be a minimum date of')} ${toStringDate(importDate(max as Date))}`,
				)
			}

			if (max) {
				if (typeof max === 'string') {
					max = fromStringDate(max)
				}

				if (max instanceof DateStamp) {
					max = max.toJSDate()
				}

				validation = (validation as DateSchema).max(
						max,
						/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
						`${label} ${t('rules.maxDate', 'must be a maximum date of')} ${toStringDate(importDate(max as Date))}`,
				)
			}

			break
		case 'phoneNumber':
			validation = (validation as StringSchema).test(
					'possible-phone-number',
					/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
					`${label} ${t('rules.validPhoneNumber', 'must be a valid phone number')}`,
					(value: string | undefined) => {
						if (value && value.length > 0) {
							return isPossiblePhoneNumber(value)
						}
						return true
					},
			)
			break
		case 'file':
			if (max) {
				validation = (validation as ValidationObjectSchema).test('fileSize',
						/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
						t('rules.fileTooLarge', 'The file is too large'),
						(value) => {
							if (!value || !value.length) return true // attachment is optional
							return value[0].size <= (max as number) * 1000000
						})
			}
			break
		default:
			throw new Error(`Unknown type: ${type}`)
	}

	if (required) {
		if (['boolean', 'boolean_checkbox', 'boolean_radio'].includes(type)) {
			validation = (validation as StringSchema).oneOf(['true'],
					/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
					`${label} ${t('rules.required', 'is required')}`)
		} else if (['radio', 'radiogroup', 'select', 'string', 'text', 'textarea'].includes(type)) {
			validation = (validation as StringSchema).notOneOf([undefined, ''],
					/* @ts-expect-error ignoring if key exists so library is not dependent next-intl */
					`${label} ${t('rules.required', 'is required')}`)
		} else {
			validation = validation.required(`${label} is required`)
		}
	}

	return validation
}

/**
 * parse a depends value
 * @param v the value to parse
 * @returns the parsed value
 */
export const dependsParseValue = (v: ValidateDependsValue) => (['boolean', 'number'].includes(typeof v) ? `${v}` : v)

/**
 * if a field depends on the value of another field
 * @param depends the depend rules that this field depends on
 * @param values the values of all fields in the form
 * @returns if the depends rules match the fields
 */
export const dependsMatch = (
		depends: ValidateDepends | ValidateDepends[],
		values: FormikValues,
): ValidateDependsValue | ValidateDependsValue[] => {
	if (Array.isArray(depends)) {
		const results = depends.map((target) => dependsMatch(target, values))

		return results.includes(true)
	}

	const target = values[depends.name]

	if (Array.isArray(depends.value)) {
		const source = depends.value.map((v) => dependsParseValue(v))

		if (Array.isArray(target)) {
			return intersection(source, target).length > 0
		}
		return source.includes(target)
	}

	const source = dependsParseValue(depends.value)

	if (Array.isArray(target)) {
		return target.includes(source)
	}

	return source === target
}


/**
 * validates a field
 * @param props ValidateProps
 * @param props.depends the depend rules that this field depends on
 * @param props.label the label for the field
 * @param props.type the validation type
 * @returns the yup validation schema for the field
 */
export const validate = <Values extends FormikValues = FormikValues>({
	depends,
	label,
	type = 'string',
	...props
}: ValidateProps<Values>) => {
	let validation: YupSchema

	switch (type) {
		case 'string':
		case 'text':
		case 'textarea':
			validation = yup.string().label(label)
			break
		case 'number':
		case 'integer':
			validation = yup.number().label(label)
			break
		case 'select':
		case 'radiogroup':
		case 'radio':
			validation = yup.string().label(label)
			break
		case 'multiselect':
		case 'checkbox':
			validation = yup.array().label(label)
			break
		case 'boolean':
		case 'boolean_radio':
		case 'boolean_checkbox':
			validation = yup.string().label(label)
			break
		case 'date':
			validation = yup
					.date()
					.label(label)
					.transform((value) => {
						if (value instanceof Date && !isNaN(+value)) {
							return value
						} else if (typeof value === 'string') {
							return fromStringDate(value).toJSDate()
						}
						return undefined
					})
			break
		case 'phoneNumber':
			validation = yup.string().label(label)
			break
		case 'file':
			validation = yup.object().label(label)
			break
		default:
			throw new Error(`Unknown type: ${type}`)
	}

	if (depends) {
		validation = validation.when(
				'any',
				(current, field, { parent }) => dependsMatch(depends, parent) ? validationRules({ label, type, validation: field, ...props }) : field,
		)
	} else {
		validation = validationRules({ label, type, validation, ...props })
	}

	return validation
}


export type Schema<Values extends FormikValues = FormikValues> = {
	[key in keyof Values]: ValidateProps<Values> | ValidationObjectSchema
}

/**
 * the yup schema definition for the form
 * @param criteria the field validation criteria
 * @returns the yup schema definition
 */
export const schema = function <Values extends FormikValues = FormikValues>(criteria: Schema<Values>) {
	const validationSchema: AnyObject = {}

	Object.entries(criteria).forEach(([key, fieldCriteria]) => {
		if (
			[
				'boolean',
				'boolean_checkbox',
				'boolean_radio',
				'checkbox',
				'date',
				'file',
				'integer',
				'multiselect',
				'number',
				'phoneNumber',
				'radio',
				'radiogroup',
				'select',
				'string',
				'text',
				'textarea',
			].includes(fieldCriteria['type'] as ValidateProps<Values>['type'])
		) {
			const currentCriteria = fieldCriteria as ValidateProps<Values>

			if (currentCriteria.mustMatch && !currentCriteria.mustMatchLabel) {
				currentCriteria.mustMatchLabel = (criteria[currentCriteria.mustMatch] as ValidateProps<Values>).label
			}

			validationSchema[key] = validate<Values>(currentCriteria)
		} else {
			validationSchema[key] = fieldCriteria as ValidationObjectSchema
		}
	})

	return yup.object().shape(validationSchema)
}