import { DetailedHTMLProps, FC, ThHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { aligns, DAligns, DTextColors, sizes } from './d'
import { useTable } from './table'

export type HAligns = DAligns
export type HTextColors = DTextColors

export type HProps = MergeElement<
	DetailedHTMLProps<ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>, {
		align?: Breakpoints<HAligns>
	}>

/**
 * styled Table Heading cell (<th>)
 * @param props H props
 * @param props.align alignment of children
 * @param props.children children
 * @param props.className html class names
 * @returns table heading cell
 */
export const H: FC<HProps> = ({ align = 'start', children, className, ...props }) => {
	const { backgroundColor, size } = useTable()

	const textColors: UiOptions<HTextColors> = {
		black: 'text-white',
		transparent: 'text-gray-900',
		white: 'text-gray-900',
	}

	const ui = parseUi({
		className: className || 'text-left font-semibold',
		name: 'Table.H',
		styles: {
			align: { options: aligns, selected: align },
			sizes: { options: sizes, selected: size },
			textColors: { options: textColors, selected: backgroundColor },
		},
	})

	return (
		<td {...ui.attributes} className={ui.className} {...sanitizeProps(props)} >
			{children}
		</td>
	)
}

H.displayName = 'Table.H'

export default H
