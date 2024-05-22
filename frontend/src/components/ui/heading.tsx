import { createElement, DetailedHTMLProps, FC, type HTMLAttributes, ReactHTML } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { aligns, type ParagraphAlign, type ParagraphWeight, weights } from './paragraph'

export type HeadingSizes = '2xl' | '2xs' | 'base' | 'large' | 'medium' | 'small' | 'xl' | 'xs'
export type HeadingColors = 'black' | 'white'
export type HeadingProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		align?: Breakpoints<ParagraphAlign>
		as?: keyof ReactHTML
		color?: Breakpoints<HeadingColors>
		size?: Breakpoints<HeadingSizes>
		weight?: Breakpoints<ParagraphWeight>
	}>

/**
 * Styled heading
 * @param props Heading props
 * @param props.align the text alignment for the heading
 * @param props.as the html element type
 * @param props.children the heading content
 * @param props.className html class names
 * @param props.color the color of the heading
 * @param props.size the size of the heading
 * @param props.weight the font weight of the heading
 * @returns the heading
 */
export const Heading: FC<HeadingProps> = ({ align, as = 'div', children, className, color = 'black', size = 'medium', weight = 'semibold', ...props }) => {
	const colors: UiOptions<HeadingColors> = {
		black: 'text-black',
		white: 'text-white',
	}

	const sizes: UiOptions<HeadingSizes> = { // Tailwind: font-semibold  sm:font-semibold  md:font-semibold  lg:font-semibold  xl:font-semibold
		default: 'block',
		'2xs': 'text-sm', // Tailwind: sm:text-sm  md:text-sm  lg:text-sm  xl:text-sm  2xl:text-sm
		xs: 'text-md', // Tailwind: sm:text-md  md:text-md  lg:text-md  xl:text-md 2xl:text-md
		small: 'text-lg', // Tailwind: sm:text-lg  md:text-lg  lg:text-lg  xl:text-lg  2xl:text-lg
		medium: 'text-xl', // Tailwind: sm:text-xl  md:text-xl  lg:text-xl  xl:text-xl  2xl:text-xl
		large: 'text-2xl', // Tailwind: sm:text-2xl  md:text-2xl  lg:text-2xl  xl:text-2xl  2xl:text-2xl
		xl: 'text-3xl', // Tailwind: sm:text-3xl  md:text-3xl  lg:text-3xl  xl:text-3xl  2xl:text-3xl
		'2xl': 'text-4xl', // Tailwind: sm:text-4xl  md:text-4xl  lg:text-4xl  xl:text-4xl  2xl:text-4xl
		base: 'text-base', // Tailwind: sm:text-base  md:text-base  lg:text-base  xl:text-base 2xl:text-base
	}

	const ui = parseUi({
		className: `${className}`,
		name: 'Heading',
		styles: {
			aligns: { options: aligns, selected: align },
			colors: { options: colors, selected: color },
			sizes: { options: sizes, selected: size },
			weights: { options: weights, selected: weight },
		},
	})

	return createElement(as as string,
			{ ...ui.attributes, className: ui.className, ...sanitizeProps(props) },
			children)
}

Heading.displayName = 'Heading'

export default Heading
