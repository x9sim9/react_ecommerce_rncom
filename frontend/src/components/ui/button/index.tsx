import { isEmpty, map } from 'lodash'
import { ComponentProps, FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Error } from '@/components/ui/form/error'
import { Grid, type GridProps } from '@/components/ui/grid'
import { parseUi, type UiOptions } from '@/components/ui/ui'

import {
	BasicButton,
	BasicButtonColors,
	BasicButtonProps,
	type BasicButtonPropsButton,
	type BasicButtonPropsText,
	BasicButtonSizes,
	type BasicButtonWidths,
	type ButtonColorsProps,
	buttonWidths,
} from './basic_button'

export type ButtonColors = BasicButtonColors
export type ButtonSizes = BasicButtonSizes

export type ButtonPropsShared = {
	disabled?: boolean
	icon?: FC<ComponentProps<'svg'>>
	isRunning?: boolean
	rootClassName?: string
	uiComponent?: string

}

/**
 * tailwind classes for button
 * @param props buttonColors props
 * @param props.disabled if buttons disabled
 * @param props.isRunning if buttons running
 * @param props.type button type
 * @returns tailwind classes
 */
export const buttonColors = ({ disabled, isRunning, type }: ButtonColorsProps): UiOptions<BasicButtonColors> => ({
	danger: type === 'text' ? 'text-red-600' : 'border-2 border-red-500 bg-red-500 hover:bg-red-700 text-white', // Tailwind: sm:border-red-100 sm:text-red-600 sm:bg-red-500 sm:hover:bg-red-700 sm:text-white  md:border-red-100 md:text-red-600 md:bg-red-500 md:hover:bg-red-700 md:text-white  lg:border-red-100 lg:text-red-600 lg:bg-red-500 lg:hover:bg-red-700 lg:text-white  xl:border-red-100 xl:text-red-600 xl:bg-red-500 xl:hover:bg-red-700 xl:text-white

	dangerOutline: 'border-2 bg-red-50 border-red-500 hover:bg-red-200 text-red-600', // Tailwind: sm:bg-red-50 sm:border-red-500 sm:hover:bg-red-200 sm:text-red-600  md:bg-red-50 md:border-red-500 md:hover:bg-red-200 md:text-red-600  lg:bg-red-50 lg:border-red-500 lg:hover:bg-red-200 lg:text-red-600  xl:bg-red-50 xl:border-red-500 xl:hover:bg-red-200 xl:text-red-600  2xl:bg-red-50 2xl:border-red-500 2xl:hover:bg-red-200 2xl:text-red-600
	dark: type === 'text' ? 'text-black' : 'border-2 border-black bg-black hover:bg-gray-600 text-white', // Tailwind: sm:border-black sm:bg-black sm:hover:bg-gray-600 sm:text-white  md:border-black md:bg-black md:hover:bg-gray-600 md:text-white  lg:border-black lg:bg-black lg:hover:bg-gray-600 lg:text-white  xl:border-black xl:black xl:hover:bg-gray-600 xl:text-white  2xl:border-black 2xl:black 2xl:hover:bg-gray-600 2xl:text-white

	darkOutline: 'border-2 bg-white border-black hover:bg-gray-200 text-black', // Tailwind: sm:bg-white sm:border-black sm:hover:bg-gray-200 sm:text-black  md:bg-white md:border-black md:hover:bg-gray-200 md:text-black  lg:bg-white lg:border-black lg:hover:bg-gray-200 lg:text-black  xl:bg-white xl:border-black xl:hover:bg-gray-200 xl:text-black  2xl:bg-white 2xl:border-black 2xl:hover:bg-gray-200 2xl:text-black
	info: type === 'text' ? 'text-cyan-600' : 'border-2 border-cyan-500 bg-cyan-500 hover:bg-cyan-700 text-white', // Tailwind: sm:border-cyan-100 sm:text-cyan-600 sm:bg-cyan-500 sm:hover:bg-cyan-700 sm:text-white  md:border-cyan-100 md:text-cyan-600 md:bg-cyan-500 md:hover:bg-cyan-700 md:text-white  lg:border-cyan-100 lg:text-cyan-600 lg:bg-cyan-500 lg:hover:bg-cyan-700 lg:text-white  xl:border-cyan-100 xl:text-cyan-600 xl:bg-cyan-500 xl:hover:bg-cyan-700 xl:text-white

	infoOutline: 'border-2 bg-cyan-50 border-cyan-500 hover:bg-cyan-200 text-cyan-600', // Tailwind: sm:bg-cyan-50 sm:border-cyan-500 sm:hover:bg-cyan-200 sm:text-cyan-600  md:bg-cyan-50 md:border-cyan-500 md:hover:bg-cyan-200 md:text-cyan-600  lg:bg-cyan-50 lg:border-cyan-500 lg:hover:bg-cyan-200 lg:text-cyan-600  xl:bg-cyan-50 xl:border-cyan-500 xl:hover:bg-cyan-200 xl:text-cyan-600  2xl:bg-cyan-50 2xl:border-cyan-500 2xl:hover:bg-cyan-200 2xl:text-cyan-600
	light: 'border-2 bg-white border-grey-500 hover:bg-gray-200 text-black', // Tailwind: sm:bg-white sm:border-black-500 sm:hover:bg-gray-200 sm:text-black-600  md:bg-white md:border-black-500 md:hover:bg-gray-200 md:text-black-600  lg:bg-white lg:border-black-500 lg:hover:bg-gray-200 lg:text-black-600  xl:bg-white xl:border-black-500 xl:hover:bg-gray-200 xl:text-black-600  2xl:bg-white 2xl:border-black-500 2xl:hover:bg-gray-200 2xl:text-black-600

	primary: type === 'text' ? 'text-blue-600' : 'border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white', // Tailwind: sm:border-blue-100 sm:text-blue-600 sm:bg-blue-500 sm:hover:bg-blue-700 sm:text-white  md:border-blue-100 md:text-blue-600 md:bg-blue-500 md:hover:bg-blue-700 md:text-white  lg:border-blue-100 lg:text-blue-600 lg:bg-blue-500 lg:hover:bg-blue-700 lg:text-white  xl:border-blue-100 xl:text-blue-600 xl:bg-blue-500 xl:hover:bg-blue-700 xl:text-white
	primaryOutline: 'border-2 bg-blue-50 border-blue-500 hover:bg-blue-200 text-blue-600', // Tailwind: sm:bg-blue-50 sm:border-blue-500 sm:hover:bg-blue-200 sm:text-blue-600  md:bg-blue-50 md:border-blue-500 md:hover:bg-blue-200 md:text-blue-600  lg:bg-blue-50 lg:border-blue-500 lg:hover:bg-blue-200 lg:text-blue-600  xl:bg-blue-50 xl:border-blue-500 xl:hover:bg-blue-200 xl:text-blue-600  2xl:bg-blue-50 2xl:border-blue-500 2xl:hover:bg-blue-200 2xl:text-blue-600

	secondary: type === 'text' ? 'text-gray-600' : 'border-2 border-gray-500 bg-gray-500 hover:bg-gray-700 text-white', // Tailwind: sm:border-gray-100 sm:text-gray-600 sm:bg-gray-500 sm:hover:bg-gray-700 sm:text-white  md:border-gray-100 md:text-gray-600 md:bg-gray-500 md:hover:bg-gray-700 md:text-white  lg:border-gray-100 lg:text-gray-600 lg:bg-gray-500 lg:hover:bg-gray-700 lg:text-white  xl:border-gray-100 xl:text-gray-600 xl:bg-gray-500 xl:hover:bg-gray-700 xl:text-white  2xl:border-gray-100 2xl:text-gray-600 2xl:bg-gray-500 2xl:hover:bg-gray-700 2xl:text-white
	secondaryOutline: 'border-2 bg-gray-50 border-gray-500 hover:bg-gray-200 text-gray-600', // Tailwind: sm:bg-gray-50 sm:border-gray-500 sm:hover:bg-gray-200 sm:text-gray-600  md:bg-gray-50 md:border-gray-500 md:hover:bg-gray-200 md:text-gray-600  lg:bg-gray-50 lg:border-gray-500 lg:hover:bg-gray-200 lg:text-gray-600  xl:bg-gray-50 xl:border-gray-500 xl:hover:bg-gray-200 xl:text-gray-600  2xl:bg-gray-50 2xl:border-gray-500 2xl:hover:bg-gray-200 2xl:text-gray-600

	success:
			type === 'text' ? 'text-green-600' : 'border-2 border-green-500 bg-green-500 hover:bg-green-700 text-white', // Tailwind: sm:border-green-100 sm:text-green-600 sm:bg-green-500 sm:hover:bg-green-700 sm:text-white  md:border-green-100 md:text-green-600 md:bg-green-500 md:hover:bg-green-700 md:text-white  lg:border-green-100 lg:text-green-600 lg:bg-green-500 lg:hover:bg-green-700 lg:text-white  xl:border-green-100 xl:text-green-600 xl:bg-green-500 xl:hover:bg-green-700 xl:text-white  2xl:border-green-100 2xl:text-green-600 2xl:bg-green-500 2xl:hover:bg-green-700 2xl:text-white
	successOutline: 'border-2 bg-green-100 border-green-500 hover:bg-green-200 text-green-600', // Tailwind: sm:bg-green-100 sm:border-green-500 sm:hover:bg-green-200 sm:text-green-600  md:bg-green-100 md:border-green-500 md:hover:bg-green-200 md:text-green-600  lg:bg-green-100 lg:border-green-500 lg:hover:bg-green-200 lg:text-green-600  xl:bg-green-100 xl:border-green-500 xl:hover:bg-green-200 xl:text-green-600  2xl:bg-green-100 2xl:border-green-500 2xl:hover:bg-green-200 2xl:text-green-600

	warning:
			type === 'text' ? 'text-yellow-600' : 'border-2 border-yellow-300 bg-yellow-300 hover:bg-yellow-400 text-black', // Tailwind: sm:border-yellow-100 sm:text-yellow-600 sm:bg-yellow-500 sm:hover:bg-yellow-700 sm:text-white  md:border-yellow-100 md:text-yellow-600 md:bg-yellow-500 md:hover:bg-yellow-700 md:text-white  lg:border-yellow-100 lg:text-yellow-600 lg:bg-yellow-500 lg:hover:bg-yellow-700 lg:text-white  xl:border-yellow-100 xl:text-yellow-600 xl:bg-yellow-500 xl:hover:bg-yellow-700 xl:text-white  xzl:border-yellow-100 zxl:text-yellow-600 xl:bg-yellow-500 xzl:hover:bg-yellow-700 xzl:text-white

	warningOutline: 'border-2 bg-yellow-50 border-yellow-500 hover:bg-yellow-200 text-yellow-600', // Tailwind: sm:bg-yellow-50 sm:border-yellow-500 sm:hover:bg-yellow-200 sm:text-yellow-600  md:bg-yellow-50 md:border-yellow-500 md:hover:bg-yellow-200 md:text-yellow-600  lg:bg-yellow-50 lg:border-yellow-500 lg:hover:bg-yellow-200 lg:text-yellow-600  xl:bg-yellow-50 xl:border-yellow-500 xl:hover:bg-yellow-200 xl:text-yellow-600  2xl:bg-yellow-50 2xl:border-yellow-500 2xl:hover:bg-yellow-200 2xl:text-yellow-600
})

export type ButtonPropsNoError =
		{
			containerProps?: never
			errorMessage?: never
		} & BasicButtonProps

export type ButtonPropsWithError =
		{
			containerProps?: GridProps
			errorMessage?: string | string[]
		} & BasicButtonProps

export type ButtonPropsButton =
		BasicButtonPropsButton &
		(ButtonPropsNoError | ButtonPropsWithError)

export type ButtonPropsText =
		BasicButtonPropsText &
		(ButtonPropsNoError | ButtonPropsWithError)

export type ButtonProps = ButtonPropsButton | ButtonPropsText

/**
 * styled buttons
 * @param props Button props
 * @param props.children button content
 * @param props.errorMessage error message for button
 * @param props.icon the @heroicon to use
 * @param props.size button size
 * @param props.type button type
 * @param props.width button width
 * @returns the button
 */
export const Button: FC<ButtonProps> = ({
	children,
	errorMessage,
	icon,
	size,
	type = 'button',
	width,
	...props
}) => {
	const Icon = icon

	const widths: UiOptions<BasicButtonWidths> = {
		default: '',
		...buttonWidths,
	}

	const ui = parseUi({
		styles: {
			widths: { options: widths, selected: width },
		},
	})

	return (
		errorMessage
			? (
					<Grid className={ui.className} gap="xs" size="normal" width="fit">
						<BasicButton
							size={size}
							type={type}
							width={width}
							{...(sanitizeProps(props) as Omit<BasicButtonProps, 'size' | 'type'>)}
						>
							{Icon ? <Icon className={`inline-block size-5 ${children ? 'mr-1' : ''}`}/> : null}
							{children}
						</BasicButton>

						{!isEmpty(errorMessage)
							? map(Array.isArray(errorMessage) ? errorMessage : [errorMessage], (error) => (
								<Error>{error}</Error>
							))
							: null}
					</Grid>
				)
			: (
					<BasicButton
						size={size}
						type={type}
						width={width}
						{...(sanitizeProps(props) as Omit<BasicButtonProps, 'size' | 'type'>)}
					>
						{Icon ? <Icon className={`inline-block size-5 ${children ? 'mr-1' : ''}`}/> : null}
						{children}
					</BasicButton>
				)
	)
}

Button.displayName = 'Button'

export default Button
