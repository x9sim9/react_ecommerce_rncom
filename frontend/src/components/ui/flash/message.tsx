import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { DetailedHTMLProps, FC, type HTMLAttributes, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui'
import type { FlashMessage } from '@/components/ui/flash/flash_slice'
import { type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'

export type MessageTypes = FlashMessage['type']

export type MessageProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
		children: ReactNode
		title?: string
		type: MessageTypes
	}>

/**
 * flash message
 * @param props Message props
 * @param props.children message content
 * @param props.className html class names
 * @param props.title the message title
 * @param props.type message type
 * @returns the message
 */
export const Message: FC<MessageProps> = ({ children, className, title, type, ...props }) => {
	const backgroundStyles = parseUi({
		className,
		name: 'Flash.Message',
		styles: {
			colors: {
				options: {
					default: 'rounded p-3 border border-l-4 bg-opacity-40',
					danger: 'bg-red-50 border-red-600',
					info: 'bg-cyan-50 border-cyan-600',
					success: 'bg-green-50 border-green-600',
					warning: 'bg-yellow-50 border-yellow-600',
				} as UiOptions<MessageTypes>,
				selected: type,
			},
		},
	})

	const iconStyles = parseUi({
		styles: {
			colors: {
				options: {
					default: 'opacity-80 mt-[-1px]',
					danger: 'text-red-700',
					info: 'text-cyan-700',
					success: 'text-green-700',
					warning: 'text-yellow-700',
				} as UiOptions<MessageTypes>,
				selected: type,
			},
		},
	})

	const titleStyles = parseUi({
		styles: {
			colors: {
				options: {
					default: 'whitespace-pre-line text-sm font-bold',
					danger: 'text-red-700',
					info: 'text-cyan-700',
					success: 'text-green-700',
					warning: 'text-yellow-700',
				} as UiOptions<MessageTypes>,
				selected: type,
			},
		},
	})

	const messageStyles = parseUi({
		styles: {
			colors: {
				options: {
					default: 'whitespace-pre-line text-sm',
					danger: 'text-red-800',
					info: 'text-cyan-800',
					success: 'text-green-800',
					warning: 'text-yellow-800',
				} as UiOptions<MessageTypes>,
				selected: type,
			},
		},
	})

	const icons = { danger: XCircleIcon, info: InformationCircleIcon, success: CheckCircleIcon, warning: ExclamationCircleIcon }

	const Icon = icons[type]

	return (
		<div {...backgroundStyles.attributes} className={backgroundStyles.className} {...sanitizeProps(props)}>
			<Grid gap="xs" size="flex" verticalAlign="top">
				<Icon aria-hidden="true" className={iconStyles.className} height={20}/>
				<Grid gap={3} width="none">
					{title ? <h3 className={titleStyles.className}>{title}</h3> : null}
					<Grid className={messageStyles.className} gap={3}>
						{/* eslint-disable-next-line react/no-array-index-key */}
						{Array.isArray(children) ? children.map((child, i) => <div key={child}>{child}</div>) : children}
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Message