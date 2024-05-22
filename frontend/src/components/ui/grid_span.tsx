import { createElement, DetailedHTMLProps, type FC, type HTMLAttributes, ReactHTML } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { GridVerticalAligns } from './grid'

export const verticalAligns = {
	bottom: 'grid w-full items-end', // Tailwind: sm:items-end  md:items-end  lg:items-end  xl:items-end
	middle: 'grid w-full items-center', // Tailwind: sm:items-center  md:items-center  lg:items-center  xl:items-center
	top: 'grid w-full items-start', // Tailwind: sm:items-start  md:items-start  lg:items-start  xl:items-start
}

export type GridSpanStyles = ''
export type GridSpanAlign = 'center' | 'end' | 'start'
export type GridSpanSizes = 'auto' | 'full' | 'fullRow' | 0 | 1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type GridSpanProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		align?: Breakpoints<GridSpanAlign>
		as?: keyof ReactHTML
		size?: Breakpoints<GridSpanSizes>
		verticalAlign?: Breakpoints<GridVerticalAligns>
	}>

/**
 * Positions elements within a Grid
 * @param props GridSpan props
 * @param props.align the alignment of the children
 * @param props.as the html element type
 * @param props.children children
 * @param props.className html class names
 * @param props.size the size of the span
 * @param props.verticalAlign the vertical alignment for the span
 * @returns the positioned children
 */
export const GridSpan: FC<GridSpanProps> = ({
	align,
	as = 'div',
	children,
	className,
	size,
	verticalAlign,
	...props
}) => {
	const aligns: UiOptions<GridSpanAlign> = {
		default: '',

		center: 'justify-self-center justify-items-center', // Tailwind: sm:justify-self-center  md:justify-self-center  lg:justify-self-center  xl:justify-self-center  2xl:justify-self-center
		end: 'justify-self-end justify-items-end', // Tailwind: sm:justify-self-end  md:justify-self-end  lg:justify-self-end  xl:justify-self-end  2xl:justify-self-end
		start: 'justify-self-start justify-items-start', // Tailwind: sm:justify-self-start  md:justify-self-start  lg:justify-self-start  xl:justify-self-start  2xl:justify-self-start
	}

	const sizes: UiOptions<GridSpanSizes> = {
		default: '',

		0: 'hidden', // Tailwind: sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden
		// Tailwind: sm:block  md:block  lg:block  xl:block  2xl:block
		1: 'block col-span-1', // Tailwind: sm:col-span-1  md:col-span-1  lg:col-span-1  xl:col-span-1  2xl:col-span-1
		10: 'block col-span-10', // Tailwind: sm:col-span-10  md:col-span-10  lg:col-span-10  xl:col-span-10  2xl:col-span-10
		11: 'block col-span-11', // Tailwind: sm:col-span-11  md:col-span-11  lg:col-span-11  xl:col-span-11  2xl:col-span-11
		12: 'block col-span-12', // Tailwind: sm:col-span-12  md:col-span-12  lg:col-span-12  xl:col-span-12  2xl:col-span-12
		2: 'block col-span-2', // Tailwind: sm:col-span-2  md:col-span-2  lg:col-span-2  xl:col-span-2  2xl:col-span-2
		3: 'block col-span-3', // Tailwind: sm:col-span-3  md:col-span-3  lg:col-span-3  xl:col-span-3  2xl:col-span-3
		4: 'block col-span-4', // Tailwind: sm:col-span-4  md:col-span-4  lg:col-span-4  xl:col-span-4  2xl:col-span-4
		5: 'block col-span-5', // Tailwind: sm:col-span-5  md:col-span-5  lg:col-span-5  xl:col-span-5  2xl:col-span-5
		6: 'block col-span-6', // Tailwind: sm:col-span-6  md:col-span-6  lg:col-span-6  xl:col-span-6  2xl:col-span-6
		7: 'block col-span-7', // Tailwind: sm:col-span-7  md:col-span-7  lg:col-span-7  xl:col-span-7  2xl:col-span-7
		8: 'block col-span-8', // Tailwind: sm:col-span-8  md:col-span-8  lg:col-span-8  xl:col-span-8  2xl:col-span-8
		9: 'block col-span-9', // Tailwind: sm:col-span-9  md:col-span-9  lg:col-span-9  xl:col-span-9  2xl:col-span-9
		auto: 'block col-auto', // Tailwind: sm:col-auto1  md:col-auto  lg:col-auto  xl:col-auto  2xl:col-auto
		full: 'block col-span-full', // Tailwind: sm:col-span-full  md:col-span-full  lg:col-span-full  xl:col-span-full  2xl:col-span-full
		fullRow: 'grow',
	}

	const ui = parseUi({
		className,
		name: 'GridSpan',
		styles: {
			align: { options: aligns, selected: align },
			size: { options: sizes, selected: size },
			verticalAlign: { options: verticalAligns, selected: verticalAlign },
		},
	})

	return (
		createElement(as as string,
				{ ...ui.attributes, className: ui.className, ...sanitizeProps(props) },
				children))
}

GridSpan.displayName = 'GridSpan'

export default GridSpan
