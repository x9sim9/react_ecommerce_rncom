'use client'

import { isEqual } from 'lodash'
import { createRef, DetailedHTMLProps, FC, type HTMLAttributes, ReactNode, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { sanitizeProps } from '@/helpers/component'
import { uiSelector } from '@/lib/store'

import { Breakpoints, getBreakpointValue, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type TooltipColors = 'black' | 'danger' | 'grey' | 'info' | 'light' | 'primary' | 'secondary' | 'success' | 'warning'
export type TooltipPositions = 'bottom' | 'left' | 'right' | 'top'
export type TooltipSizes = 'large' | 'medium' | 'small' | 'xl'
export type TooltipWidths = 'fit' | 'full' | 'half' | 'large' | 'medium' | 'small'
export type TooltipBorders = TooltipColors

export type TooltipProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		border?: Breakpoints<TooltipBorders>
		color?: Breakpoints<TooltipColors>
		expiresAfter?: number
		message: ReactNode
		position?: Breakpoints<TooltipPositions>
		size?: Breakpoints<TooltipSizes>
		width?: Breakpoints<TooltipWidths>
	}>

/**
 * A styled tooltip that appears next to the children
 * @param props Tooltip props
 * @param props.border border styles
 * @param props.children children
 * @param props.className html class names
 * @param props.color color styles
 * @param props.expiresAfter expiry duration in seconds (the tooltip will disappear after expiry duration)
 * @param props.message the tooltip message
 * @param props.position the position of the tooltip relative to the children
 * @param props.size the size of the tooltip
 * @param props.width the width of the tooltip
 * @returns the tooltip
 */
export const Tooltip: FC<TooltipProps> = ({
	border = 'none' as const,
	children,
	className,
	color = 'grey',
	expiresAfter,
	message,
	position = 'right',
	size = 'medium',
	width = 'fit',
	...props
}) => {
	const ui = useSelector(uiSelector, isEqual)
	const tipRef = createRef<HTMLDivElement>()
	const [isHover, setIsHover] = useState<boolean>()
	const [currentMessage, setCurrentMessage] = useState<TooltipProps['message']>()

	useMemo(() => {
		setCurrentMessage(message)


		if (typeof window !== 'undefined') {
			expiresAfter && window.setTimeout(() => {
				setCurrentMessage(undefined)
			}, expiresAfter * 1000)
		}
	}, [message, expiresAfter])

	position = getBreakpointValue<TooltipPositions>(position, ui.breakpoints)
	border = getBreakpointValue<TooltipBorders>(border, ui.breakpoints)

	const alt = {
		bottom: 'top',
		left: 'right',
		right: 'left',
		top: 'bottom',
	}

	const widths: UiOptions<TooltipWidths> = {
		small: 'w-48',
		medium: 'w-72',
		large: 'w-96',
		fit: 'w-fit min-w-72',
		full: 'w-full',
		half: 'w-1/2',
	}

	const sizes: UiOptions<TooltipSizes> = {
		default: 'font-bold',
		small: 'px-3 py-2 text-xs',
		medium: 'px-3 py-2 text-sm',
		large: 'px-4 py-2',
		xl: 'px-4 py-2 text-xl',
	}

	const positions: UiOptions<TooltipPositions> = {
		default: `${isHover ? 'block' : 'hidden'} m${alt[position][0]}-3 ${alt[position]}-full absolute whitespace-no-wrap rounded flex items-center transition-all duration-150`, // Tailwind: mr-3 ml-3 mt-3 mb-3  right-full left-full top-full bottom-full
		bottom: 'bg-gradient-to-b',
		left: 'bg-gradient-to-l',
		right: 'bg-gradient-to-r',
		top: 'bg-gradient-to-t',
	}

	const colors: UiOptions<TooltipColors> = {
		black: 'bg-black text-white',
		danger: 'bg-red-500 text-white',
		grey: 'bg-gray-700 text-white',
		info: 'bg-cyan-500 text-white',
		light: 'bg-white text-black',
		primary: 'bg-blue-500 text-white',
		secondary: 'bg-gray-500 text-white',
		success: 'bg-green-500 text-white',
		warning: 'bg-yellow-500 text-white',
	}

	const borders: UiOptions<TooltipBorders> = {
		default: '',
		black: 'border border-black',
		danger: 'border border-red-500',
		grey: 'border border-gray-700',
		info: 'border border-cyan-500',
		light: 'border border-white',
		none: '',
		primary: 'border border-blue-500',
		secondary: 'border border-gray-500',
		success: 'border border-green-500',
		warning: 'border border-yellow-500',
	}

	const tooltipStyle = parseUi({
		className: `${className} ${['left', 'right'].includes(position) ? 'bottom-1/2 translate-y-1/2 whitespace-nowrap' : 'right-1/2 translate-x-1/2'}  `,
		name: 'Tooltip',
		styles: {
			borders: { options: borders, selected: border },
			colors: { options: colors, selected: getBreakpointValue<TooltipColors>(color, ui.breakpoints) },
			positions: { options: positions, selected: position },
			sizes: { options: sizes, selected: getBreakpointValue<TooltipSizes>(size, ui.breakpoints) },
			widths: { options: widths, selected: getBreakpointValue<TooltipWidths>(width, ui.breakpoints) },
		},
	})

	const symbolStyle = parseUi({
		className: `h-3 w-3 absolute -${alt[position]}-1 rotate-45 ${['bottom', 'top'].includes(position) ? 'right-1/2' : ''}`, // Tailwind: -right-1 -left-1 -top-1 -bottom-1
		name: 'Tooltip',
		styles: {
			colors: { options: colors, selected: border !== 'none' ? border : color },
		},
	})

	if (!currentMessage) {
		return children
	}

	return (
		<div className={`${width === 'full' ? 'block' : 'inline-block'}`} {...sanitizeProps(props)}>
			<div
				{...tooltipStyle.attributes}
				className={`relative ${width === 'full' ? 'w-full' : 'w-fit'}`}
				onPointerEnter={() => setIsHover(true)}
				onPointerLeave={() => setIsHover(false)}
			>
				<div className={`${tooltipStyle.className} shadow-lg shadow-gray-500`} ref={tipRef}>
					<div className={symbolStyle.className}/>
					<div className={`${['bottom', 'top'].includes(position) ? 'text-center' : ''}`} data-testid="ui.tooltip.message">
						{currentMessage}
					</div>
				</div>
				{children}
			</div>
		</div>
	)
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
