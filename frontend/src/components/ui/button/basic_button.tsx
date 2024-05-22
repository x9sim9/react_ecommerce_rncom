import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import type { Empty } from '@/helpers/typescript'

import { linkColors, type LinkColorsText, type LinkSizesText } from '@/components/ui/link'
import { type ParagraphSizesText, textSizes as paragraphTextSizes } from '@/components/ui/paragraph'
import { Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { buttonColors, ButtonPropsShared } from './index'

export type BasicButtonTypes = 'button' | 'submit' | 'text'

export type BasicButtonColors = 'danger' | 'dangerOutline' | 'dark' | 'darkOutline' | 'info' | 'infoOutline'
		| 'light' | 'primary' | 'primaryOutline' | 'secondary' | 'secondaryOutline' | 'success' | 'successOutline'
		| 'warning' | 'warningOutline'
export type BasicButtonSizes = '2xl' | '2xlSquare' | '2xs' | '2xsSquare' | '3xl' | '3xlSquare' | '3xs'
		| '3xsSquare' | 'large' | 'largeSquare' | 'medium' | 'mediumSquare' | 'small' | 'smallSquare' | 'xl'
		| 'xlSquare' | 'xs' | 'xsSquare'
export type BasicButtonWidths = 'fit' | 'full'
export type BasicButtonTextSizes = ParagraphSizesText

export type BasicButtonPropsShared = Empty

export type BasicButtonPropsText = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {
		color?: Breakpoints<LinkColorsText>
		size?: Breakpoints<LinkSizesText>
		textSize?: never
		type?: 'text'
		width?: never
	} & BasicButtonPropsShared & ButtonPropsShared>

export type BasicButtonPropsButton = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {
		color?: Breakpoints<BasicButtonColors>
		size?: Breakpoints<BasicButtonSizes>
		textSize?: BasicButtonTextSizes
		type?: 'button' | 'submit'
		width?: BasicButtonWidths
	} & BasicButtonPropsShared & ButtonPropsShared>

export type BasicButtonProps = BasicButtonPropsButton | BasicButtonPropsText

export type ButtonColorsProps = Pick<BasicButtonProps, 'disabled' | 'isRunning' | 'type'>

export const buttonSizes: UiOptions<BasicButtonSizes> = {
	default: 'leading-4',

	'3xs': 'py-0 px-1', // Tailwind:  sm:py-0 sm:px-0  md:py-0 md:px-0  lg:py-0 lg:px-0  xl:py-0 xl:px-0  2xl:py-0 2xl:px-0
	'2xs': 'py-0.5 px-1.5', // Tailwind:  sm:py-0 sm:px-0  md:py-0 md:px-0  lg:py-0 lg:px-0  xl:py-0 xl:px-0  2xl:py-0 2xl:px-0
	xs: 'py-1 px-2', // Tailwind:  sm:py-0 sm:px-0  md:py-0 md:px-0  lg:py-0 lg:px-0  xl:py-0 xl:px-0  2xl:py-0 2xl:px-0
	small: 'py-1.5 px-2.5', // Tailwind: sm:py-1 sm:px-2  md:py-1 md:px-2  lg:py-1 lg:px-2  xl:py-1 xl:px-2  2xl:py-1 2xl:px-2
	medium: 'py-2 px-3', // Tailwind: sm:py-2 sm:px-4  md:py-2 md:px-4  lg:py-2 lg:px-4  xl:py-2 xl:px-4  2xl:py-2 2xl:px-4
	large: 'py-2.5 px-3.5', // Tailwind: sm:py-3 sm:px-4  md:py-3 md:px-4  lg:py-3 lg:px-4  xl:py-3 xl:px-4  2xl:py-3 2xl:px-4
	xl: 'py-3 px-4', // Tailwind: sm:py-3 sm:px-4  md:py-3 md:px-4  lg:py-3 lg:px-4  xl:py-3 xl:px-4  2xl:py-3 2xl:px-4
	'2xl': 'py-3.5 px-4.5', // Tailwind: sm:py-3 sm:px-4  md:py-3 md:px-4  lg:py-3 lg:px-4  xl:py-3 xl:px-4  2xl:py-3 2xl:px-4
	'3xl': 'py-4 px-5', // Tailwind: sm:py-3 sm:px-4  md:py-3 md:px-4  lg:py-3 lg:px-4  xl:py-3 xl:px-4  2xl:py-3 2xl:px-4

	'2xlSquare': 'py-3.5 px-3.5',
	'2xsSquare': 'py-0.5 px-0.5',
	'3xlSquare': 'py-4 px-4',
	'3xsSquare': 'py-0 px-0',
	largeSquare: 'py-2.5 px-2.5',
	mediumSquare: 'py-2 px-2',
	smallSquare: 'py-1.5 px-1.5',
	xlSquare: 'py-3 px-3',
	xsSquare: 'py-1 px-1',
}

export const buttonWidths = {
	fit: 'w-fit',
	full: 'w-full',
}

/**
 * styled basic button
 * @param props BasicButton props
 * @param props.children button content
 * @param props.className html class names
 * @param props.color the button color
 * @param props.disabled if buttons disabled
 * @param props.isRunning if buttons running
 * @param props.size button size
 * @param props.textSize button text size
 * @param props.type button type
 * @param props.uiComponent ui component type
 * @param props.width button width
 * @returns the button
 */
export const BasicButton: FC<Omit<BasicButtonProps, 'errorMessage'>> = ({
	children, className, color = 'primary', disabled, isRunning,
	size = 'medium', textSize, type, uiComponent,
	width = 'fit', ...htmlProps
}) => {
	const widths: UiOptions<BasicButtonWidths> = {
		default: '',
		...buttonWidths,
	}

	const textSizes: UiOptions<BasicButtonTextSizes> = {
		...paragraphTextSizes,
	}

	const sizes = type === 'text' ? textSizes : buttonSizes

	const types: UiOptions<BasicButtonTypes> = {
		button: 'rounded font-bold', // Tailwind: sm:rounded sm:font-bold  md:rounded md:font-bold  lg:rounded lg:font-bold  xl:rounded xl:font-bold  2xl:rounded 2xl:font-bold
		submit: 'rounded font-bold', // Tailwind: sm:rounded sm:font-bold  md:rounded md:font-bold  lg:rounded lg:font-bold  xl:rounded xl:font-bold  2xl:rounded 2xl:font-bold
		text: 'p-0 w-fit border-0 font-semibold', // Tailwind: sm:p-0 sm:w-fit sm:border-0  md:p-0 md:w-fit md:border-0  lg:p-0 lg:w-fit lg:border-0  xl:p-0 xl:w-fit xl:border-0  2xl:p-0 2xl:w-fit 2xl:border-0
	}

	const colors = type === 'text'
		? linkColors()
		: {
				...buttonColors({ disabled, isRunning, type }),
				default: ` ${
					(disabled || isRunning) && `opacity-70 ${disabled && 'cursor-not-allowed'} ${isRunning && 'cursor-wait'}`
				}`,
			}

	const ui = parseUi({
		className: `${type === 'text' ? 'underline-offset-[4px] group-hover:underline hover:underline group-hover:drop-shadow-md hover:drop-shadow-md' : ''} ${className}`,
		name: uiComponent || 'Button',
		styles: {
			color: { options: colors, selected: color },
			size: { options: sizes, selected: size },
			textSizes: { options: textSizes, selected: textSize },
			types: { options: types, selected: type },
			widths: { options: widths, selected: width },
		},
	})

	return (
		<button
			{...ui.attributes}
			disabled={disabled || isRunning}
			type={type === 'submit' ? 'submit' : 'button'}
			{...sanitizeProps(htmlProps)}
			className={ui.className}
		>
			{isRunning
				? <svg
						aria-hidden="true"
						className="mr-2 inline-block size-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
						fill="none"
						viewBox="0 0 100 101"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"/>
					</svg>
				: null}
			{children}
		</button>
	)
}

export default BasicButton
