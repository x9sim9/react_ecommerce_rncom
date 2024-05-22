import type { HTMLProps, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { parseUi, type UiOptions } from './ui'

export type BadgeColors = 'danger' | 'dark' | 'grey' | 'indigo' | 'info' | 'light' | 'pink' | 'primary' | 'purple' | 'secondary' | 'success' | 'warning'
export type BadgeSizes = 'large' | 'medium' | 'small' | 'xs'
export type BadgePadding = 'large' | 'medium' | 'small' | 'xl' | 'xs' | 'xxl'
export type BadgeType = 'box' | 'round' | 'square'
export type BadgeWidths = 'fit' | 'full' | 'max' | 'min'

export interface BadgeProps extends Omit<HTMLProps<HTMLSpanElement>, 'color' | 'size' | 'type'> {
	children: ReactNode
	className?: string
	color?: BadgeColors
	padding?: BadgePadding
	size?: BadgeSizes
	type?: BadgeType
	width?: BadgeWidths
}

/**
 * styled badges / tags
 * @param props Badge props
 * @param props.children badge content
 * @param props.className html class names
 * @param props.color the badge color
 * @param props.padding the badge padding
 * @param props.size the badge size
 * @param props.type the badge type
 * @param props.width the badge width
 * @returns the badge
 */
export const Badge = ({ children, className, color = 'primary', padding, size = 'medium', type = 'round', width = 'fit', ...htmlProps }: BadgeProps) => {
	if (!padding) {
		padding = size
	}

	const colors: UiOptions<BadgeColors> = {
		default: '',

		danger: 'bg-red-100 text-red-800',
		dark: 'bg-black text-white',
		grey: 'bg-gray-600 text-white',
		indigo: 'bg-indigo-100 text-indigo-800',
		info: 'bg-cyan-100 text-cyan-800',
		light: 'bg-white text-black',
		pink: 'bg-pink-100 text-pink-800',
		primary: 'bg-blue-100 text-blue-800',
		purple: 'bg-purple-100 text-purple-800',
		secondary: 'bg-gray-100 text-gray-800',
		success: 'bg-green-100 text-green-800',
		warning: 'bg-yellow-100 text-yellow-800',
	}

	const sizes: UiOptions<BadgeSizes> = {
		default: 'inline-flex items-center    font-medium ',

		xs: 'text-2xs',
		small: 'text-xs',
		medium: 'text-sm',
		large: '',
	}

	const paddings: UiOptions<BadgePadding> = {
		xs: 'px-1.5 py-0.5',
		small: 'px-2.5 py-0.5',
		medium: 'px-3 py-1',
		large: 'px-3.5 py-1.5',
		xl: 'px-5 py-3',
		xxl: 'px-7 py-5',
	}

	const types: UiOptions<BadgeType> = {
		default: '',

		box: 'rounded-xl',
		round: 'rounded-full',
		square: 'rounded',
	}

	const widths: UiOptions<BadgeWidths> = {
		fit: 'w-fit',
		full: 'w-full',
		max: 'w-max',
		min: 'w-min',
	}

	const ui = parseUi({
		className,
		name: 'Badge',
		styles: {
			color: { options: colors, selected: color },
			paddings: { options: paddings, selected: padding },
			sizes: { options: sizes, selected: size },
			types: { options: types, selected: type },
			widths: { options: widths, selected: width },
		},
	})

	return (
		<span {...ui.attributes} {...sanitizeProps(htmlProps)} className={ui.className}>
			{children}
		</span>
	)
}

Badge.displayName = 'Badge'

export default Badge
