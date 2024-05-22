import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { parseUi, type UiOptions } from '@/components/ui/ui'

import { TableBackgroundColors, useTable } from './table'

export type HeadProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>

/**
 * styled Table Head (<thead>)
 * @param props Head props
 * @param props.children children <Row>
 * @param props.className html class names
 * @returns table head
 */
export const Head: FC<HeadProps> = ({ children, className, ...props }) => {
	const { backgroundColor } = useTable()

	const backgroundColors: UiOptions<TableBackgroundColors> = {
		black: 'bg-gray-800',
		transparent: '',
		white: 'bg-gray-50',
	}

	const ui = parseUi({
		className: className,
		name: 'Table.Head',
		styles: {
			backgroundColor: { options: backgroundColors, selected: backgroundColor },
		},
	})

	return (
		<thead {...ui.attributes} className={ui.className} {...sanitizeProps(props)}>
			{children}
		</thead>
	)
}

Head.displayName = 'Table.Head'

export default Head
