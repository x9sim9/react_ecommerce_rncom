import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type BodyGaps = 'large' | 'medium' | 'none' | 'small' | 'xl' | 'xs'

export type BodyProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		gap?: Breakpoints<BodyGaps>
	}>

/**
 * The panel body
 * @param props Body props
 * @param props.children children
 * @param props.className html class names
 * @param props.gap the padding for the children
 * @returns the panel body
 */
export const Body: FC<BodyProps> = ({ children, className, gap = 'medium', ...props }) => {
	const gaps: UiOptions<BodyGaps> = {
		xs: 'py-1 px-3', // Tailwind: sm:py-1 sm:px-2  md:py-1 md:px-2  lg:py-1 lg:px-2  xl:py-1 xl:px-2  2xl:py-1 2xl:px-2
		small: 'py-2 px-3', // Tailwind: sm:py-2 sm:px-3  md:py-2 md:px-3  lg:py-2 lg:px-3  xl:py-2 xl:px-3  2xl:py-2 2xl:px-3
		medium: 'py-3 px-4', // Tailwind: sm:py-3 sm:px-4  md:py-3 md:px-4  lg:py-3 lg:px-4  xl:py-3 xl:px-4  2xl:py-3 2xl:px-4
		large: 'py-4 px-5', // Tailwind: sm:py-4 sm:px-5  md:py-4 md:px-5  lg:py-4 lg:px-5  xl:py-4 xl:px-5  2xl:py-4 xl:px-5
		xl: 'py-5 px-6', // Tailwind: sm:py-5 sm:px-6  md:py-5 md:px-6  lg:py-5 lg:px-6  xl:py-5 xl:px-6  2xl:py-5 2xl:px-6
		none: '',
	}

	const ui = parseUi({
		className: `${className}`,
		name: 'Panel.Body',
		styles: {
			gap: { options: gaps, selected: gap },
		},
	})

	return (
		<div {...ui.attributes} className={ui.className} {...sanitizeProps(props)}>
			{children}
		</div>
	)
}

Body.displayName = 'Panel.Body'

export default Body
