import { createElement, DetailedHTMLProps, FC, type HTMLAttributes, ReactHTML } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type GridGaps = '2xl' | 'large' | 'medium' | 'small' | 'xl' | 'xs' | 1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type GridAligns = 'center' | 'end' | 'start'
export type GridVerticalAligns = 'bottom' | 'middle' | 'top'
export type GridSizes = 'flex' | 'flow' | 'normal' | 'row' | 0 | 1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type GridWidths = 'fit' | 'full' | 'max' | 'min'

export const aligns: UiOptions<GridAligns> = {
	center: 'justify-items-center', // Tailwind: sm:justify-items-center  md:justify-items-center  lg:justify-items-center  xl:justify-items-center
	end: 'justify-items-end', // Tailwind: sm:justify-items-end  md:justify-items-end  lg:justify-items-end  xl:justify-items-end
	start: 'justify-items-start', // Tailwind: sm:justify-items-start  md:justify-items-start  lg:justify-items-start  xl:justify-items-start
}

export const verticalAligns = {
	bottom: 'items-end', // Tailwind: sm:items-end  md:items-end  lg:items-end  xl:items-end
	middle: 'items-center', // Tailwind: sm:items-center  md:items-center  lg:items-center  xl:items-center
	top: 'items-start', // Tailwind: sm:items-start  md:items-start  lg:items-start  xl:items-start
}

export const sizes: UiOptions<GridSizes> = {
	0: 'hidden', // Tailwind: sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden
	// Tailwind: sm:grid  md:grid  lg:grid  xl:grid  2xl:grid
	// Tailwind: sm:grid-none md:grid-none lg:grid-none xl:grid-none 2xl:grid-none
	// Tailwind: sm:flex md:flex lg:flex xl:flex 2xl:flex
	1: 'grid grid-cols-1 flex-none', // Tailwind: sm:grid-cols-1  md:grid-cols-1  lg:grid-cols-1  xl:grid-cols-1  2xl:grid-cols-1
	10: 'grid grid-cols-10 flex-none', // Tailwind: sm:grid-cols-10  md:grid-cols-10  lg:grid-cols-10  xl:grid-cols-10  2xl:grid-cols-10

	11: 'grid grid-cols-11 flex-none', // Tailwind: sm:grid-cols-11  md:grid-cols-11  lg:grid-cols-11  xl:grid-cols-11  2xl:grid-cols-11
	12: 'grid grid-cols-12 flex-none', // Tailwind: sm:grid-cols-12  md:grid-cols-12  lg:grid-cols-12  xl:grid-cols-12  2xl:grid-cols-12
	2: 'grid grid-cols-2 flex-none', // Tailwind: sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-2  xl:grid-cols-2  2xl:grid-cols-2
	3: 'grid grid-cols-3 flex-none', // Tailwind: sm:grid-cols-3  md:grid-cols-3  lg:grid-cols-3  xl:grid-cols-3  2xl:grid-cols-3
	4: 'grid grid-cols-4 flex-none', // Tailwind: sm:grid-cols-4  md:grid-cols-4  lg:grid-cols-4  xl:grid-cols-4  2xl:grid-cols-4
	5: 'grid grid-cols-5 flex-none', // Tailwind: sm:grid-cols-5  md:grid-cols-5  lg:grid-cols-5  xl:grid-cols-5  2xl:grid-cols-5
	6: 'grid grid-cols-6 flex-none', // Tailwind: sm:grid-cols-6  md:grid-cols-6  lg:grid-cols-6  xl:grid-cols-6  2xl:grid-cols-6
	7: 'grid grid-cols-7 flex-none', // Tailwind: sm:grid-cols-7  md:grid-cols-7  lg:grid-cols-7  xl:grid-cols-7  2xl:grid-cols-7
	8: 'grid grid-cols-8 flex-none', // Tailwind: sm:grid-cols-8  md:grid-cols-8  lg:grid-cols-8  xl:grid-cols-8  2xl:grid-cols-8
	9: 'grid grid-cols-9 flex-none', // Tailwind: sm:grid-cols-9  md:grid-cols-9  lg:grid-cols-9  xl:grid-cols-9  2xl:grid-cols-9

	// Tailwind: sm:flex-none md:flex-none lg:flex-none xl:flex-none 2xl:flex-none
	flex: 'flex grid-none',
	flow: 'grid grid-flow-col auto-cols-max', // Tailwind: sm:grid-flow-col sm:auto-cols-max  md:grid-flow-col md:auto-cols-max  lg:grid-flow-col lg:auto-cols-max  xl:grid-flow-col xl:auto-cols-max  2xl:grid-flow-col 2xl:auto-cols-max
	normal: 'grid grid-rows-1 flex-none', // Tailwind: sm:grid-rows-1  md:grid-rows-1  lg:grid-rows-1  xl:grid-rows-1  2xl:grid-rows-1
	row: 'flex flex-col h-full grid-none', // Tailwind: sm:flex-col sm:h-full  md:flex-col md:h-full  lg:flex-col lg:h-full  xl:flex-col xl:h-full  2xl:flex-col 2xl:h-full
}

export const gaps: UiOptions<GridGaps> = {
	default: '',

	xs: 'gap-2',

	small: 'gap-4',
	medium: 'gap-6',
	large: 'gap-8',
	xl: 'gap-10',
	'2xl': 'gap-12',
	1: 'gap-1', // Tailwind: sm:gap-1  md:gap-1  lg:gap-1  xl:gap-1  2xl:gap-1

	10: 'gap-10', // Tailwind: sm:gap-10  md:gap-10  lg:gap-10  xl:gap-10  2xl:gap-10
	11: 'gap-11', // Tailwind: sm:gap-11  md:gap-11  lg:gap-11  xl:gap-11  2xl:gap-11
	12: 'gap-12', // Tailwind: sm:gap-12  md:gap-12  lg:gap-12  xl:gap-12  2xl:gap-12
	2: 'gap-2', // Tailwind: sm:gap-2  md:gap-2  lg:gap-2  xl:gap-2  2xl:gap-2
	3: 'gap-3', // Tailwind: sm:gap-3  md:gap-3  lg:gap-3  xl:gap-3  2xl:gap-3
	4: 'gap-4', // Tailwind: sm:gap-4  md:gap-4  lg:gap-4  xl:gap-4  2xl:gap-4
	5: 'gap-5', // Tailwind: sm:gap-5  md:gap-5  lg:gap-5  xl:gap-5  2xl:gap-5
	6: 'gap-6', // Tailwind: sm:gap-6  md:gap-6  lg:gap-6  xl:gap-6  2xl:gap-6
	7: 'gap-7', // Tailwind: sm:gap-7  md:gap-7  lg:gap-7  xl:gap-7  2xl:gap-7
	8: 'gap-8', // Tailwind: sm:gap-8  md:gap-8  lg:gap-8  xl:gap-8  2xl:gap-8
	9: 'gap-9', // Tailwind: sm:gap-9  md:gap-9  lg:gap-9  xl:gap-9  2xl:gap-9
	none: '',
}

const widths: UiOptions<GridWidths> = {
	fit: 'w-fit',
	full: 'w-full',
	max: 'w-max',
	min: 'w-min',
}

export type GridProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		align?: Breakpoints<GridAligns>
		as?: keyof ReactHTML
		gap?: Breakpoints<GridGaps>
		size?: Breakpoints<GridSizes>
		verticalAlign?: Breakpoints<GridVerticalAligns>
		width?: Breakpoints<GridWidths>
	}>

/**
 * Positions elements
 *
 * Everything you need for positioning elements along with GridSpan
 * @param props Grid props
 * @param props.align the alignment of the children
 * @param props.as the html element type
 * @param props.children children
 * @param props.className html class names
 * @param props.gap the space between children
 * @param props.size the size of the grid
 * @param props.verticalAlign the vertical alignment for the span
 * @param props.width the width of the grid
 * @returns the positioned children
 */
export const Grid: FC<GridProps> = ({
	align,
	as = 'div',
	children,
	className,
	gap = 'medium',
	size = 1,
	verticalAlign = 'middle',
	width,
	...props
}) => {
	width = width || 'full'

	const ui = parseUi({
		className: className,
		name: 'Grid',
		styles: {
			align: { options: aligns, selected: align },
			gap: { options: gaps, selected: gap },
			sizes: { options: sizes, selected: size },
			verticalAlign: { options: verticalAligns, selected: verticalAlign },
			widths: { options: widths, selected: width },
		},
	})

	return (
		createElement(as as string,
				{ ...ui.attributes, className: ui.className, ...sanitizeProps(props) },
				children))
}

Grid.displayName = 'Grid'

export default Grid
