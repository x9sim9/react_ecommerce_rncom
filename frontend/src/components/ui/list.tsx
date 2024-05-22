import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type ListStyles = 'disc' | 'number'
export type ListGaps = 'large' | 'medium' | 'small' | 'xl'

export type ListPropsShared = {
	gap?: ListGaps
}

export type ListPropsBullet = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
		{
			listStyle?: ListStyles
		} & ListPropsShared>

export type ListPropsNumber = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>,
		{
			listStyle?: 'number'
		} & ListPropsShared>

export type ListProps = ListPropsBullet | ListPropsNumber

/**
 * Styled lists
 * @param props List props
 * @param props.children <li> tags
 * @param props.gap the gap between children
 * @param props.listStyle the style for the list icon
 * @returns the list
 */
export const List: FC<ListProps> = ({ children, gap = 'medium', listStyle = 'disc', ...props }) => {
	const gaps: UiOptions<ListGaps> = {
		small: 'space-y-0',
		medium: 'space-y-1',
		large: 'space-y-2',
		xl: 'space-y-3',
	}

	const listStyles: UiOptions<ListStyles> = {
		default: 'pl-5 ',
		disc: 'list-disc',
		number: 'list-decimal',
	}

	const { attributes, className } = parseUi({
		name: 'List',
		styles: {
			gaps: { options: gaps, selected: gap },
			type: { options: listStyles, selected: listStyle },
		},
	})

	return (
		<ul {...attributes} className={className} role="list" {...sanitizeProps(props)}>
			{children}
		</ul>
	)
}

List.displayName = 'List'

export default List
