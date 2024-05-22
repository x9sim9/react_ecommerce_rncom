import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import Paragraph, { type ParagraphProps } from '@/components/ui/paragraph'

export type IdProps = ParagraphProps & {
	children: string
}

/**
 * Formats an id
 * @param id tbe id to format
 * @returns the formatted id
 */
export const formatId = (id?: string) => id && id.match(/.{1,4}/g)?.join('-')

/**
 * Formats an id
 * @param props Id props
 * @param props.children tbe id to format
 * @returns the formatted id
 */
export const Id: FC<IdProps> = ({ children, ...props }) => (
	<Paragraph {...sanitizeProps(props)}>{formatId(children)}</Paragraph>
)

export default Id