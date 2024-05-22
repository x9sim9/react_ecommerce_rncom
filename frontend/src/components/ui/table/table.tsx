import { createContext, DetailedHTMLProps, FC, type HTMLAttributes, useContext, useMemo } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type TableSizes = 'large' | 'medium' | 'small' | 'xl' | 'xs'
export type TableBorderColors = 'black' | 'white'
export type TableBorderOpacity = 'medium' | 'none'
export type TableBackgroundColors = 'black' | 'transparent' | 'white'
export type TableDivideColors = 'black' | 'transparent' | 'white'
export type TableBorders = 'full' | 'inner'

export type TableContextType = {
	backgroundColor?: TableBackgroundColors
	borderColor: TableBorderColors
	borderOpacity: TableBorderOpacity
	divideColor?: TableDivideColors
	size: TableSizes
}

export const TableContext = createContext<TableContextType>({
	backgroundColor: 'white',
	borderColor: 'black',
	borderOpacity: 'none',
	divideColor: 'black',
	size: 'medium',
})

export type TableProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>, {
		backgroundColor?: TableBackgroundColors
		border?: TableBorders
		borderColor?: TableBorderColors
		borderOpacity?: TableBorderOpacity
		containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
		divideColor?: TableDivideColors
		size?: TableSizes
	}>

/**
 * Table Context (used to pass props from Table to child components: Head, Body, Row, D, H)
 * @returns Table context
 */
export const useTable = () => useContext<TableContextType>(TableContext)

/**
 * Styled Table (<table>)
 * @param props Table props
 * @param props.backgroundColor background color for table
 * @param props.border border style
 * @param props.borderColor border color
 * @param props.borderOpacity border opacity
 * @param props.children children <Head> or <Body>
 * @param props.className html class names
 * @param props.containerProps props for div container
 * @param props.divideColor divide color
 * @param props.size table size
 * @returns the table
 */
export const Table: FC<TableProps> = ({
	backgroundColor = 'white',
	border = 'full',
	borderColor = 'black',
	borderOpacity = 'medium',
	children,
	className,
	containerProps = {},
	divideColor,
	size = 'medium',
	...props
}) => {
	if (!divideColor) {
		divideColor = {
			black: 'white',
			transparent: 'transparent',
			white: 'black',
		}[backgroundColor] as TableDivideColors
	}

	const borders: UiOptions<TableBorders> = {
		full: `shadow ring-1 ring-${borderColor} md:rounded-md overflow-hidden`, // Tailwind: ring-black ring-white
		inner: '',
	}

	const divBorderOpacities: UiOptions<TableBorderOpacity> = {
		medium: 'ring-opacity-5',
		none: '',
	}

	const tableBorderOpacities: UiOptions<TableBorderOpacity> = {
		medium: 'divide-opacity-5',
		none: '',
	}

	const divideColors: UiOptions<TableDivideColors> = {
		black: 'divide-y-2 divide-black',
		transparent: '',
		white: 'divide-y-2 divide-white',
	}

	const divUi = parseUi({
		className,
		name: 'Table',
		styles: {
			borderOpacities: { options: divBorderOpacities, selected: borderOpacity },
			borders: { options: borders, selected: border },
		},
	})

	const tableUi = parseUi({
		className: 'min-w-full  md:rounded-lg',
		name: 'Table',
		styles: {
			borderOpacities: { options: tableBorderOpacities, selected: borderOpacity },
			divideColors: { options: divideColors, selected: divideColor },
		},
	})

	const value = useMemo(() => ({ backgroundColor, borderColor, borderOpacity, divideColor, size }), [])

	return (
		<TableContext.Provider value={value}>
			<div {...divUi.attributes} className={divUi.className} {...sanitizeProps(containerProps)}>
				<table className={tableUi.className} {...sanitizeProps(props)}>{children}</table>
			</div>
		</TableContext.Provider>
	)
}

Table.displayName = 'Table.Table'

export default Table
