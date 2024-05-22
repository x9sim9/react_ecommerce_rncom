import { isEqual, map, transform } from 'lodash'
import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { sanitizeProps } from '@/helpers/component'
import { uiSelector } from '@/lib/store'

import { type Breakpoints, getBreakpointValue, type MergeElement } from '@/components/ui/ui'

import { Body } from './body'
import { D } from './d'
import { H } from './h'
import { Head } from './head'
import { Row } from './row'
import { Table, TableProps } from './table'


export type ResponsiveTableLayouts = 'left' | 'top'

export type ResponsiveTableProps = MergeElement<
	TableProps, {
		children?: never
		data: {
			[key: string]: ReactNode | ReactNode[]
		} | ReactNode[][],
		layout: Breakpoints<ResponsiveTableLayouts>
	}>

/**
 * A styled table that will change table layout based on breakpoints
 * @param props ResponsiveTable props
 * @param props.data the table data
 * @param props.layout the layout rules for breakpoints
 * @returns the table
 */
export const ResponsiveTable: FC<ResponsiveTableProps> = ({ data, layout, ...props }) => {
	const { breakpoint, breakpoints } = useSelector(uiSelector, isEqual)
	const currentLayout = getBreakpointValue<ResponsiveTableLayouts>(layout, breakpoints)

	const tableData: ReactNode[][] = Array.isArray(data)
		? data
		: transform(data, (newData: ReactNode[][], row, key) => {
			newData.push([key, ...Array.isArray(row) ? row : [row]])
		})

	return (
		<Table {...sanitizeProps(props)}>
			{{
				left: (
					<Body>
						{map(tableData, (items, index) => (
							<Row key={index}>
								<H>{items[0]}</H>
								{map(items, (item, index2) =>
									item !== items[0]
										? (
												<D key={`${index}-${index2}`}>{item}</D>
											)
										: null)}
							</Row>
						))}
					</Body>
				),
				top: (
					<>
						<Head>
							<Row>
								{map(tableData, (row, index) => (
									<H key={index}>{row[0]}</H>
								))}
							</Row>
						</Head>
						<Body>
							{map(tableData[0], (_, index) =>
								index !== 0
									? (
											<Row key={index}>
												{map(tableData, (items, index2) => (
													<D key={`${index}-${index2}`}>{items[index]}</D>
												))}
											</Row>
										)
									: null)}
						</Body>
					</>
				),
			}[currentLayout]}
		</Table>
	)
}

export default ResponsiveTable