import { ComponentProps, DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui'
import { type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type HeadGaps = 'large' | 'medium' | 'none' | 'small' | 'xl' | 'xs'

export type HeadProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		gap?: HeadGaps
		icon?: FC<ComponentProps<'svg'>>
	}>

/**
 * the panel header
 * @param props Head props
 * @param props.children children
 * @param props.className html class names
 * @param props.gap the padding for the children
 * @param props.icon the @heroicon to use
 * @returns the panel header
 */
export const Head: FC<HeadProps> = ({ children, className, gap = 'medium', icon, ...props }) => {
	const Icon = icon

	const gaps: UiOptions<HeadGaps> = {
		xs: 'py-1 px-2', // Tailwind: sm:py-1 sm:px-2  md:py-1 md:px-2  lg:py-1 lg:px-2  xl:py-1 xl:px-2  2xl:py-1 xl:px-2
		small: 'py-2 px-3', // Tailwind: sm:py-2 sm:px-3  md:py-2 md:px-3  lg:py-2 lg:px-3  xl:py-2 xl:px-3  2xl:py-2 xl:px-3
		medium: 'py-3 px-4', // Tailwind: sm:py-3 sm:px-4  md:py-3 md:px-4  lg:py-3 lg:px-4  xl:py-3 xl:px-4  2xl:py-3 xl:px-4
		large: 'py-4 px-5', // Tailwind: sm:py-4 sm:px-5  md:py-4 md:px-5  lg:py-4 lg:px-5  xl:py-4 xl:px-5  2xl:py-4 xl:px-5
		xl: 'py-5 px-6', // Tailwind: sm:py-5 sm:px-6  md:py-5 md:px-6  lg:py-5 lg:px-6  xl:py-5 xl:px-6  2xl:py-5 xl:px-6
		none: '',
	}

	const ui = parseUi({
		className: `${className} bg-gray-100`,
		name: 'Panel.Head',
		styles: {
			gap: { options: gaps, selected: gap },
		},
	})

	return (
		<div {...ui.attributes} className={`${ui.className}`} {...sanitizeProps(props)}>
			<Grid gap={2} size="flex">
				{Icon ? <Icon height={20}/> : null}
				{children}
			</Grid>
		</div>
	)
}

Head.displayName = 'Panel.Head'

export default Head
