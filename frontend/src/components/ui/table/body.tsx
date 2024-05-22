import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { parseUi, type UiOptions } from '@/components/ui/ui'

import { TableBackgroundColors, type TableBorderOpacity, TableDivideColors, useTable } from './table'

export type BodyProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>

/**
 * styled Table Body (<tbody>)
 * @param props Body props
 * @param props.children children <Row>
 * @param props.className html class names
 * @returns table body
 */
export const Body: FC<BodyProps> = ({ children, className, ...props }) => {
	const { backgroundColor, borderOpacity, divideColor } = useTable()

	const divideColors: UiOptions<TableDivideColors> = {
		black: 'divide-black ',
		transparent: 'divide-transparent',
		white: 'divide-white',
	}

	const borderOpacities: UiOptions<TableBorderOpacity> = {
		medium: 'divide-opacity-5',
		none: '',
	}

	const backgroundColors: UiOptions<TableBackgroundColors> = {
		black: 'bg-black',
		transparent: '',
		white: 'bg-white',
	}

	const ui = parseUi({
		className: `divide-y ${className}`,
		name: 'Table.Body',
		styles: {
			backgroundColor: { options: backgroundColors, selected: backgroundColor },
			borderOpacity: { options: borderOpacities, selected: borderOpacity },
			divideColor: { options: divideColors, selected: divideColor },
		},
	})

	return (
		<tbody {...ui.attributes} className={ui.className} {...sanitizeProps(props)}>
			{children}
		</tbody>
	)
}

Body.displayName = 'Table.Body'

export default Body
