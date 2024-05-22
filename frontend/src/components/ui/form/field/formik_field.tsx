import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { FieldAttributes, FormikValues, useField, useFormikContext } from 'formik'
import { findKey, get } from 'lodash'
import { DetailedHTMLProps, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, useEffect, useMemo, useState } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'
import { Props as ReactPhoneNumberProps } from 'react-phone-number-input'
import { Props as SelectProps } from 'react-select'

import { sanitizeProps } from '@/helpers/component'

import { Tooltip } from '@/components/ui'
import { Error } from '@/components/ui/form'
import type { FieldFormikPropsShared } from '@/components/ui/form/field/field'
import { buildClassName, type BuildClassNameProps, type FieldCommonProps, type StyleElement, twMerge } from '@/components/ui/form/field/index'
import type { SelectPropsFormik } from '@/components/ui/form/select'
import { dependsMatch, ValidateDependsValue } from '@/components/ui/form/validation'
import type { MergeElement } from '@/components/ui/ui'

type ValueOf<T> = T[keyof T]
export type Option = { label: ReactNode; value: ValueOf<FormikValues> }

export type FormikFieldContainerProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type FormikFieldIconContainerProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type FormikFieldIconProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement>,
	StyleElement
>

export type FormikFieldProps<Props extends (FieldAttributes<object> | Omit<ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>, 'onChange'> | Omit<SelectProps, 'isMulti' | 'options'> | ReactDatePickerProps) & Partial<Pick<SelectPropsFormik, 'multiselect' | 'options'>>> =
		{
			children: (({ className, selectedOption }: {
				className: FieldAttributes<object>['className'],
				errorMessage: FieldFormikPropsShared['errorMessage']
				selectedOption?: boolean | Option | Option[],
			}) => ReactNode) | ReactNode
			containerProps?: FormikFieldContainerProps,
			fieldType?: 'checkbox' | 'field' | 'select',
			iconContainerProps?: FormikFieldIconContainerProps,
			iconProps?: FormikFieldIconProps,
		}
		&
		FieldCommonProps
		&
		FieldFormikPropsShared
		& Omit<Props, 'children'>

/**
 * shared functionality for all formik form fields
 * @param props FormikField props
 * @param props.children field
 * @param props.className html class names
 * @param props.containerProps props for container div
 * @param props.depends hides field unless another field matches criteria
 * @param props.errorMessage show error message text
 * @param props.fieldType field type
 * @param props.hideValidation hide all validation
 * @param props.hideValidationIcon hide validation icon
 * @param props.hideValidationMessage hide validation message
 * @param props.iconContainerProps props for icon container div
 * @param props.iconProps props for icon
 * @param props.multiselect when select can select more than one option
 * @param props.name field name
 * @param props.options field options
 * @param props.setIsHidden hide field
 * @param props.validationMessageAs validation message type
 * @returns the form field
 */
export const FormikField = <Props extends (FieldAttributes<object> | Omit<ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>, 'onChange'> | Omit<SelectProps, 'isMulti' | 'options'> | ReactDatePickerProps) & Partial<Pick<SelectPropsFormik, 'multiselect' | 'options'>>, >({
	children,
	className,
	containerProps = {},
	depends,
	errorMessage,
	fieldType = 'field',
	hideValidation,
	hideValidationIcon,
	hideValidationMessage,
	iconContainerProps = {},
	iconProps = {},
	multiselect,
	name,
	options,
	setIsHidden,
	validationMessageAs = 'text',
	...props
}: FormikFieldProps<Props>) => {
	const { isSubmitting, values } = useFormikContext()
	const [, meta, { setTouched }] = useField({ name })
	const [selectedOption, setSelectedOption] = useState<boolean | Option | Option[]>()

	useMemo(() => {
		if (depends) {
			setIsHidden && setIsHidden(!dependsMatch(depends, values as { [key: string]: ValidateDependsValue }))
		}

		let currentValues: FormikValues['value'] = ''
		if (name.match(/\./)) {
			currentValues = get(values, name)
		} else if (name.match(/[^[]+\[[^\]]+\]/)) {
			currentValues = get(values, name.replace(/\[([^\]]+)\]/, '.$1'))
		} else {
			currentValues = (values as FormikValues)[name]
		}

		switch (fieldType) {
			case 'select':
				if (!Array.isArray(currentValues)) {
					currentValues = [currentValues]
				}

				currentValues = currentValues.map((currentValue: Option['value']) => {
					const key = findKey(options, (value) => value === currentValue)

					return key ? { label: key, value: currentValue } : undefined
				})

				if (multiselect) {
					setSelectedOption(currentValues)
				} else {
					setSelectedOption(currentValues[0])
				}
				break
			case 'checkbox':
				setSelectedOption(
						![false, undefined].includes(currentValues),
				)
				break
		}
	}, [values])

	useEffect(() => {
		if (isSubmitting) {
			setTouched(true)
		}
	}, [isSubmitting])

	errorMessage = meta.touched && meta.error ? meta.error : errorMessage

	className = twMerge([
		!hideValidation && ['field', 'select'].includes(fieldType) && 'pr-10',
		!hideValidation && errorMessage
			? 'focus:ring-red-500 focus:border-red-500 border-red-300 text-red-900 placeholder-red-300'
			: !hideValidation && meta.touched && 'focus:ring-green-500 focus:border-green-500 border-green-500 text-green-900 placeholder-green-300',
		className,
	])

	containerProps.className = buildClassName<FormikFieldContainerProps>({
		element: containerProps, styles: {
			layout: {
				default: 'relative',
			},
			styles: {
				default: 'rounded-md shadow-sm',
			},
		},
	})

	iconContainerProps.className = buildClassName<FormikFieldIconContainerProps>({
		element: iconContainerProps, styles: {
			layout: {
				default: 'absolute inset-y-0 right-0 pr-3 flex items-center',
			},
			styles: {
				default: 'pointer-events-none',
			},
		},
	})

	const iconPropsStyles: BuildClassNameProps['styles'] = {
		layout: {
			default: 'h-5 w-5',
			green: '',
			red: '',
		},
		styles: {
			default: '',
			green: 'text-green-500',
			red: 'text-red-500',
		},
	}

	const icon = ({ color, Icon }: { color: FormikFieldIconProps['styleProfile'], Icon: typeof CheckCircleIcon | typeof ExclamationCircleIcon }) => (
		<div {...sanitizeProps(iconContainerProps)}>
			<Icon aria-hidden="true"
				className={buildClassName<FormikFieldIconProps, FormikFieldIconProps>({
					element: iconProps, styleProfile: color, styles: iconPropsStyles,
				})}
				{...sanitizeProps(iconProps)}
			/>
		</div>
	)

	return (
		<>
			{['field', 'select'].includes(fieldType)
				? (
						<div {...sanitizeProps(containerProps)}>
							{typeof children === 'function' ? children({ className, errorMessage, selectedOption }) : children}
							{!hideValidation && !hideValidationIcon && (
								<>
									{errorMessage ? icon({ color: 'red', Icon: ExclamationCircleIcon }) : null}
									{meta.touched && !errorMessage ? icon({ color: 'green', Icon: CheckCircleIcon }) : null}
								</>
							)}
						</div>
					)
				: (
						typeof children === 'function' ? children({ className, errorMessage, selectedOption }) : children
					)}

			{{
				text: (!hideValidation && !hideValidationMessage && errorMessage ? <Error>{errorMessage}</Error> : null),
				tooltip: (!hideValidation && !hideValidationMessage && errorMessage ? <Tooltip color="danger" message={errorMessage} position="left"/> : null),
			}[validationMessageAs]}
		</>
	)
}

export default FormikField