import { FC, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid, type GridProps, type GridSizes } from '@/components/ui/grid'
import { Paragraph, ParagraphProps } from '@/components/ui/paragraph'
import { Breakpoints } from '@/components/ui/ui'

export type ColumnsPropsContent = ReactNode | string

export type ColumnsProps = {
	items: {
		content: ColumnsPropsContent | ColumnsPropsContent[]
		title: ParagraphProps['title']
	}[]
} & Omit<GridProps, 'size' | 'verticalAlign'>

/**
 * Responsive Panel columns
 * @param props Columns props
 * @param props.className html class names
 * @param props.items column items
 * @returns the panel columns
 */
export const Columns: FC<ColumnsProps> = ({ className, items, ...props }) => {
	const breakpoints: Breakpoints<GridSizes> = {
		default: 1,
		sm: items.length > 2 ? 2 : (items.length as GridSizes),
		md: items.length > 4 ? 4 : (items.length as GridSizes),
		lg: items.length > 5 ? 5 : (items.length as GridSizes),
		xl: items.length > 7 ? 7 : (items.length as GridSizes),
	}

	return (
		<Grid className={className} size={breakpoints} verticalAlign="top" {...sanitizeProps(props)}>
			{items.map((item, key) => {
				const contents: ColumnsPropsContent[] = Array.isArray(item.content) ? item.content : [item.content]
				return (
							// eslint-disable-next-line react/no-array-index-key
					<Grid gap="none" key={key} size="normal">
						<Paragraph title={item.title}>
							{contents.map((content: ColumnsPropsContent, key) => (
											// eslint-disable-next-line react/no-array-index-key
								<div className="font-bold" key={key}>
									{content}
								</div>
							))}
						</Paragraph>
					</Grid>
				)
			})}
		</Grid>
	)
}

Columns.displayName = 'Panel.Columns'

export default Columns
