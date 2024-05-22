import { DetailedHTMLProps, FC, TdHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { TableBackgroundColors, TableSizes, useTable } from './table'

export type DAligns = 'center' | 'end' | 'start'
export type DTextColors = TableBackgroundColors

export const sizes: { [key in TableSizes]: string } = {
	xs: 'p-1 px-2',
	small: 'p-2 px-3',
	medium: 'p-3 px-4',
	large: 'p-4 px-5',
	xl: 'p-5 px-6',
}

export const aligns: { [key in DAligns]: string } = {
	center: 'text-center',
	end: 'text-right',
	start: 'text-left',
}

export type DProps = MergeElement<
	DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>, {
		align?: Breakpoints<DAligns>
	}>

/**
 * styled Table Cell (<td>)
 * @param props D props
 * @param props.align alignment of children
 * @param props.children children
 * @param props.className html class names
 * @returns table cell
 */
export const D: FC<DProps> = ({ align = 'start', children, className, ...props }: DProps) => {
	const { backgroundColor, size } = useTable()

	const layouts = {
		default: '',
	}

	const textColors: UiOptions<DTextColors> = {
		black: 'text-white',
		transparent: 'text-gray-500',
		white: 'text-gray-500',
	}

	const ui = parseUi({
		className,
		name: 'Table.D',
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

D.displayName = 'Table.D'

export default D
