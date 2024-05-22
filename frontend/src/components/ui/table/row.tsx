import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

import { TableBackgroundColors, useTable } from './table'

export type GridVerticalAligns = 'bottom' | 'middle' | 'top'

export type RowProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, {
		verticalAlign?: Breakpoints<GridVerticalAligns>
	}>

/**
 * styled Table Row (<tr>)
 * @param props Row props
 * @param props.children children <D> or <H>
 * @param props.className html class names
 * @param props.verticalAlign vertical alignment for children
 * @returns table row
 */
export const Row: FC<RowProps> = ({ children, className, verticalAlign, ...props }) => {
	const { backgroundColor } = useTable()

	const backgroundColors: UiOptions<TableBackgroundColors> = {
		black: 'even:bg-gray-800 hover:bg-gray-500',
		transparent: '',
		white: 'even:bg-gray-50 hover:bg-yellow-50',
	}

	const verticalAligns: UiOptions<GridVerticalAligns> = {
		bottom: 'align-bottom', // Tailwind: sm:align-bottom  md:align-bottom  lg:align-bottom  xl:align-bottom  2xl:align-bottom
		middle: 'align-middle', // Tailwind: sm:align-middle  md:align-middle  lg:align-middle  xl:align-middle  2xl:align-middle
		top: 'align-top', // Tailwind: sm:align-top  md:align-top  lg:align-top  xl:align-top  2xl:align-top
	}

	const ui = parseUi({
		className: className,
		name: 'Table.Row',
		styles: {
			backgroundColor: { options: backgroundColors, selected: backgroundColor },
			verticalAlign: { options: verticalAligns, selected: verticalAlign },
		},
	})

	return <tr className={ui.className} {...sanitizeProps(props)}>{children}</tr>
}

Row.displayName = 'Table.Row'

export default Row
