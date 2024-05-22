'use client'

import { FieldAttributes } from 'formik'
import { forEach, noop, trim } from 'lodash'
import { DetailedHTMLProps, type HTMLAttributes } from 'react'
import { ClassNameValue, twMerge as tailwindMerge } from 'tailwind-merge'

import type { OmitProps } from '@/helpers/typescript'

export type BoxSize = 'full' | 'none' | 'small'

export { Field, type FieldProps, type FieldPropsShared } from './field'

export type FieldCommonProps = {
	errorMessage?: string
	hideValidation?: boolean
	hideValidationIcon?: boolean
	hideValidationMessage?: boolean
	name: string
	validationMessageAs?: 'text' | 'tooltip'
}

export type FieldCommonPropsPlaceHolder = {
	placeholder?: string
}

export type FieldStyles<Types extends string | undefined> = {
	[key in 'default' | NonNullable<Types>]: string
}

export type BuildStyleProps<Styles extends string | undefined, Type extends string | undefined> = {
	className?: string | undefined,
	ignoreStyles?: NonNullable<Styles>[]
	styleProfile: 'default' | Type,
	styles: {
		[key in NonNullable<Styles>]: FieldStyles<Type>
	},
}


/**
 * build tailwind class names for field
 * @param props buildStyles props
 * @param props.className extra class names
 * @param props.ignoreStyles ignore styles for field
 * @param props.styleProfile profile for styles
 * @param props.styles all styles
 * @returns tailwind class names
 */
export const buildStyles = <Styles extends string | undefined, Type extends string | undefined>(
	{ className, ignoreStyles, styleProfile, styles }: BuildStyleProps<Styles, Type>,
) => {
	const classNames: string[] = []

	forEach(styles, (value, key) => {
		classNames.push(value['default'])

		if (!(ignoreStyles && ignoreStyles.includes(key as NonNullable<Styles>))) {
			styleProfile && classNames.push(value[styleProfile])
		}
	})

	classNames.push(className || '')

	return tailwindMerge(classNames)
}

export type DefaultStyles = 'layout' | 'styles'

export type StylesProps<Styles extends string | undefined = DefaultStyles> = {
	ignoreStyles?: NonNullable<Styles>[]
}

export type StyleElement<Styles extends string | undefined = DefaultStyles, Type extends string | undefined = string> = {
	ignoreStyles?: BuildStyleProps<Styles, Type>['ignoreStyles']
	styleProfile?: BuildStyleProps<Styles, Type>['styleProfile'],
}

export type BuildClassNameProps<
	Styles extends string | undefined = DefaultStyles,
	Type extends string | undefined = string,
	Element extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> | DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
> = {
	element: Element & StyleElement<Styles, Type>
	styleProfile?: BuildStyleProps<Styles, Type>['styleProfile'],
	styles: {
		[key in NonNullable<Styles>]: FieldStyles<Type>
	},
}

/**
 * build tailwind class names
 * @param props buildClassName props
 * @param props.element the target element
 * @param props.styleProfile profile for styles
 * @param props.styles all styles
 * @returns tailwind class names
 */
export const buildClassName = <
	Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> | DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement> | FieldAttributes<object>,
	Element extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> | DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
	Styles extends string | undefined = DefaultStyles,
	Type extends string | undefined = string,
>({
	element,
	styleProfile,
	styles,
}: BuildClassNameProps<Styles, Type, Element>) =>
	buildStyles({
		className: element.className,
		ignoreStyles: element.ignoreStyles,
		styleProfile: element.styleProfile || styleProfile || 'default',
		styles,
	})


export type GetDefaultStylesType = {
	className?: string,
} & StyleElement

/**
 * set default tailwind class names
 * @param props getDefaultStyles props
 * @param props.className extra class names
 * @param props.ignoreStyles ignore styles for field
 * @param props.styleProfile profile for styles
 * @returns tailwind class names
 */
export const getDefaultStyles = ({ className, ignoreStyles, styleProfile }: GetDefaultStylesType) => {
	const layout: FieldStyles<StyleElement['styleProfile']> = {
		default: 'block',
	}

	const styles: FieldStyles<StyleElement['styleProfile']> = {
		default: 'focus:outline-none rounded-md',
	}

	className = buildStyles<DefaultStyles, StyleElement['styleProfile']>({
		className,
		ignoreStyles,
		styleProfile,
		styles: { layout, styles },
	})

	return className
}

export type DefaultBoxSize = 'full' | 'none' | 'small'
export const defaultBoxSizes = {
	default: '',
	small: 'w-10',
	full: 'w-full',
	none: '',
}

/**
 * merge tailwind classes
 * @param data groups of tailwind classes
 * @returns merged tailwind classes
 */
export const twMerge = (...data: ClassNameValue[]) => trim(tailwindMerge(data))

const something: OmitProps<{ one: string }, { two: string }> = {
	one: 'hello',
}

export const omitPropsField = {
	boxSize: 'none' as BoxSize,
	containerProps: {},
	errorMessage: 'string',
	field: 'text' as const,
	helpTextAbove: 'string',
	helpTextBelow: 'string',
	helpTextProps: {},
	hideValidation: false,
	hideValidationIcon: false,
	hideValidationMessage: false,
	ignoreStyles: [],
	label: 'string',
	labelProps: {},
	styleProfile: 'default',
	validationMessageAs: 'text' as const,
}

export const omitPropsFormik = {
	depends: [],
	fieldType: 'field' as const,
	iconContainerProps: {},
	iconProps: {},
	setIsHidden: noop,
}

export const omitPropsHtml = {
	initialValue: 'string',
}
