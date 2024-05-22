import { createElement, DetailedHTMLProps, FC, type HTMLAttributes, ReactHTML, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { Grid, type GridProps } from './grid'

export type ParagraphSizesText = '2xl' | '2xs' | '3xl' | '4xl' | '5xl' | 'base' | 'large' | 'medium' | 'small' | 'xl' | 'xs'
export type ParagraphAlign = 'center' | 'end' | 'justify' | 'start'
export type ParagraphWeight = 'bold' | 'extrabold' | 'extralight' | 'light' | 'max' | 'medium' | 'normal' | 'semibold' | 'thin' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const weights: UiOptions<ParagraphWeight> = {
	default: '',
	medium: 'font-medium', // Tailwind: sm:font-medium  md:font-medium  lg:font-medium  xl:font-medium  2xl:font-medium
	1: 'font-thin',
	// eslint-disable-next-line sonarjs/no-duplicate-string
	2: 'text-center',
	3: 'font-light',
	4: 'font-normal',
	5: 'font-medium',
	6: 'font-semibold',
	7: 'font-bold',
	8: 'font-extrabold',

	9: 'font-black',
	bold: 'font-bold', // Tailwind: sm:font-bold  md:font-bold  lg:font-bold  xl:font-bold  2xl:font-bold
	extrabold: 'font-extrabold', // Tailwind: sm:font-extrabold  md:font-extrabold  lg:font-extrabold  xl:font-extrabold  2xl:font-extrabold
	extralight: 'text-center', // Tailwind: sm:font-extralight  md:font-extralight  lg:font-extralight  xl:font-extralight  2xl:font-extralight
	light: 'font-light', // Tailwind: sm:font-light  md:font-light  lg:font-light  xl:font-light  2xl:font-light
	max: 'font-black', // Tailwind: sm:font-black  md:font-black  lg:font-black  xl:font-black  2xl:font-black
	normal: 'font-normal', // Tailwind: sm:font-normal  md:font-normal  lg:font-normal  xl:font-normal  2xl:font-normal
	semibold: 'font-semibold', // Tailwind: sm:font-semibold  md:font-semibold  lg:font-semibold  xl:font-semibold  2xl:font-semibold
	thin: 'font-thin', // Tailwind: sm:font-thin  md:font-thin  lg:font-thin  xl:font-thin  2xl:font-thin
}

export const aligns: UiOptions<ParagraphAlign> = {
	default: '',

	center: 'text-center', // Tailwind: sm:text-center  md:text-center  lg:text-center  xl:text-center  2xl:text-center
	end: 'text-right', // Tailwind: sm:text-right  md:text-right  lg:text-right  xl:text-right  2xl:text-right
	justify: 'text-justify', // Tailwind: sm:text-justify  md:text-justify  lg:text-justify  xl:text-justify  2xl:text-justify
	start: 'text-left', // Tailwind: sm:text-left  md:text-left lg:text-left  xl:text-left  2xl:text-left
}

export type ParagraphPropsShared = {
	align?: Breakpoints<ParagraphAlign>
	as?: keyof ReactHTML
	size?: Breakpoints<ParagraphSizesText>
	weight?: Breakpoints<ParagraphWeight>
}

export type ParagraphPropsNoTitle =
		{
			containerProps: never
			title?: never
		} & ParagraphPropsShared

export type ParagraphPropsWithTitle =
		{
			containerProps?: Omit<GridProps, 'size'>
			title?: ReactNode | string
		} & ParagraphPropsShared

export type ParagraphProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		Omit<GridProps, 'size'> & (
		ParagraphPropsNoTitle
		| ParagraphPropsWithTitle
		)>

export const textSizes: UiOptions<ParagraphSizesText> = {
	'2xs': 'text-2xs', // Tailwind: sm:text-2xs  md:text-2xs  lg:text-2xs  xl:text-2xs  2xl:text-2xs
	xs: 'text-xs', // Tailwind: sm:text-xs  md:text-xs  lg:text-xs  xl:text-xs  2xl:text-xs
	small: 'text-sm', // Tailwind: sm:text-sm  md:text-sm  lg:text-sm  xl:text-sm  2xl:text-sm
	medium: 'text-md', // Tailwind: sm:text-md  md:text-md  lg:text-md  xl:text-md  2xl:text-md
	large: 'text-lg', // Tailwind: sm:text-lg  md:text-lg  lg:text-lg  xl:text-lg  2xl:text-lg
	xl: 'text-xl', // Tailwind: sm:text-xl  md:text-xl  lg:text-xl  xl:text-xl  2xl:text-xl
	'2xl': 'text-2xl', // Tailwind: sm:text-2xl  md:text-2xl  lg:text-2xl  xl:text-2xl  2xl:text-2xl
	'3xl': 'text-3xl', // Tailwind: sm:text-3xl  md:text-3xl  lg:text-3xl  xl:text-3xl  2xl:text-3xl
	'4xl': 'text-4xl', // Tailwind: sm:text-4xl  md:text-4xl  lg:text-4xl  xl:text-4xl  2xl:text-4xl
	'5xl': 'text-5xl', // Tailwind: sm:text-5xl  md:text-5xl  lg:text-5xl  xl:text-5xl  2xl:text-5xl
	base: 'text-base', // Tailwind: sm:text-base  md:text-base  lg:text-base  xl:text-base  2xl:text-base
}

/**
 * A styled paragraph
 * @param props Paragraph props
 * @param props.align alignment of text in paragraph
 * @param props.as the html element type
 * @param props.children the paragraph text (can be more than one paragraphs)
 * @param props.className html class names
 * @param props.size the size of the paragraph
 * @param props.title the title for the paragraph
 * @param props.weight the font weight for the paragraph
 * @returns the paragraph
 */
export const Paragraph: FC<ParagraphProps> = ({ align = 'none', as = 'p', children, className, size = 'medium', title, weight, ...props }) => {
	const sizes: UiOptions<ParagraphSizesText> = {
		...textSizes,
	}

	const ui = parseUi({
		className,
		name: 'Paragraph',
		styles: {
			align: { options: aligns, selected: align },
			size: { options: sizes, selected: size },
			weight: { options: weights, selected: weight },
		},
	})

	return (
		title
			? (
					<Grid gap="none" size="normal" width="fit">
						<h4 className="text-sm font-bold text-gray-600">{title}</h4>
						<div {...ui.attributes} className={ui.className} {...sanitizeProps(props)}>
							{createElement(as as string,
									{ ...ui.attributes, className: ui.className, ...sanitizeProps(props) },
									children)}
						</div>
					</Grid>
				)
			: (
					createElement(as as string,
							{ ...ui.attributes, className: ui.className, ...sanitizeProps(props) },
							children)
				)
	)
}

Paragraph.displayName = 'Paragraph'

export default Paragraph
