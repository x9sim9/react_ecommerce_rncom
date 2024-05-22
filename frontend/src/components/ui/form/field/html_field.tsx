import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { DetailedHTMLProps, type HTMLAttributes, type InputHTMLAttributes, ReactNode, type TextareaHTMLAttributes } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'
import { Props as ReactPhoneNumberProps } from 'react-phone-number-input'
import { Props as SelectProps } from 'react-select'

import { sanitizeProps } from '@/helpers/component'

import { Error, ErrorProps } from '@/components/ui/form/error'
import { buildClassName, type BuildClassNameProps, type FieldCommonProps, type StyleElement, twMerge } from '@/components/ui/form/field/index'
import type { MergeElement } from '@/components/ui/ui'

export type HtmlFieldContainerProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type HtmlFieldIconContainerProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	StyleElement
>

export type HtmlFieldIconProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement>,
	StyleElement
>

export type HtmlFieldProps<Props extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> | DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> | Omit<ReactDatePickerProps, 'maxDate' | 'minDate' | 'onChange'> | Omit<ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>, 'onChange'> | Omit<SelectProps, 'isMulti' | 'options'>> =
		{
			children: (({ className }: { className: Props['className'] }) => ReactNode) | ReactNode
			containerProps?: HtmlFieldContainerProps,
			errorProps?: ErrorProps,
			fieldType?: 'checkbox' | 'field' | 'select',
			iconContainerProps?: HtmlFieldIconContainerProps,
			iconProps?: HtmlFieldIconProps,
		} &
		FieldCommonProps &
		Omit<Props, 'children'> & Pick<ErrorProps, 'className'>

/**
 * shared functionality for all html form fields
 * @param props HtmlField props
 * @param props.children field
 * @param props.className html class names
 * @param props.containerProps props for container div
 * @param props.errorMessage show error message text
 * @param props.errorProps props for Error
 * @param props.fieldType field type
 * @param props.hideValidation hide validation message
 * @param props.iconContainerProps props for icon container div
 * @param props.iconProps props for icon
 * @returns the form field
 */
export const HtmlField = <Props extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> | DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> | Omit<ReactDatePickerProps, 'maxDate' | 'minDate' | 'onChange'> | Omit<ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>, 'onChange'> | Omit<SelectProps, 'isMulti' | 'options'>, >({
	children,
	className,
	containerProps = {},
	errorMessage,
	errorProps,
	fieldType = 'field',
	hideValidation,
	iconContainerProps = {},
	iconProps = {},
}: HtmlFieldProps<Props>) => {
	className = twMerge([
		!hideValidation && ['field', 'select'].includes(fieldType) && 'pr-10',
		!hideValidation && errorMessage
			? 'focus:ring-red-500 focus:border-red-500 border-red-300 text-red-900 placeholder-red-300'
			: !hideValidation && !errorMessage && 'focus:ring-green-500 focus:border-green-500 border-green-500 text-green-900 placeholder-green-300',
		className,
	])

	containerProps.className = buildClassName<HtmlFieldContainerProps>({
		element: containerProps, styles: {
			layout: {
				default: 'relative',
			},
			styles: {
				default: 'rounded-md shadow-sm',
			},
		},
	})

	iconContainerProps.className = buildClassName<HtmlFieldIconContainerProps>({
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

	const icon = ({ color, Icon }: { color: HtmlFieldIconProps['styleProfile'], Icon: typeof CheckCircleIcon | typeof CheckCircleIcon }) => (
		<div {...sanitizeProps(iconContainerProps)}>
			<Icon aria-hidden="true"
				className={buildClassName<HtmlFieldIconProps, HtmlFieldIconProps>({
					element: iconProps, styleProfile: color, styles: iconPropsStyles,
				})}
				{...sanitizeProps(iconProps)}
			/>
		</div>
	)

	return (
		<>
			<div {...sanitizeProps(containerProps)}>
				{typeof children === 'function' ? children({ className }) : children}
				{!hideValidation && (
					<>
						{errorMessage ? icon({ color: 'red', Icon: ExclamationCircleIcon }) : null}
						{!errorMessage && icon({ color: 'green', Icon: ExclamationCircleIcon })}
					</>
				)}
			</div>
			{errorMessage ? <Error {...sanitizeProps(errorProps)}>{errorMessage}</Error> : null}
		</>
	)
}

export default HtmlField