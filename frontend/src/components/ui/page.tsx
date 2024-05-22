import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { parseUi } from '@/components/ui/ui'

export type PageProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

/**
 * The page layout with breakpoints
 * @param props Page props
 * @param props.children children
 * @returns children
 */
export const Page: FC<PageProps> = ({ children, ...props }) => {
	const pages = {
		default: 'grow px-2 sm:px-6 lg:mx-auto lg:container',
	}

	const { attributes, className } = parseUi({ name: 'Page', styles: { page: { options: pages } } })

	return (
		<div {...attributes} className={className} {...sanitizeProps(props)}>
			{children}
		</div>
	)
}

Page.displayName = 'Page'

export default Page
