import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import parseUi from '@/components/ui/ui'

export type PanelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

/**
 * styled panel
 * @param props Panel props
 * @param props.children children <Head>, <Body> or <Foot>
 * @param props.className html class names
 * @returns the panel
 */
export const Panel: FC<PanelProps> = ({ children, className, ...props }) => {
	const ui = parseUi({
		className: `bg-white shadow ring-1 ring-black/5 md:rounded-md ${className}`,
		name: 'Panel.Panel',
	})

	return (
		<div {...ui.attributes} className={`flex flex-col gap-0 ${ui.className}`} {...sanitizeProps(props)}>
			{children}
		</div>
	)
}

Panel.displayName = 'Panel'

export default Panel
