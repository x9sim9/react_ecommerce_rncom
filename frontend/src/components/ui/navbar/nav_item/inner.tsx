import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { FC, useMemo, useState } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Grid } from '@/components/ui/grid'
import { parseUi } from '@/components/ui/ui'

import { colors, gaps, NavItemContext, type NavItemPropsMenu } from './index'

export type InnerProps = {
	close: () => void
	onClick?: () => void
	open: boolean
} & NavItemPropsMenu

/**
 * for nav item drop downs
 * @param props Inner props
 * @param props.children dropdown items
 * @param props.close trigger close
 * @param props.color color of items
 * @param props.dropdownPosition the position of the dropdown when clicked
 * @param props.gap gap between items
 * @param props.href link url
 * @param props.icon the @heroicon to use
 * @param props.label the label for the item
 * @param props.onClick triggered when clicked
 * @param props.onClose triggered when closed
 * @param props.onOpen triggered when opened
 * @param props.open trigger open
 * @param props.showCollapsed show item in navbar when collapsed (default false)
 * @param props.showDialog if dialog is visible
 * @returns the dropdown items
 */
export const Inner: FC<InnerProps> = ({
	children, close, color = 'white', dropdownPosition = 'right', gap, href, icon, label, onClick, onClose, onOpen,
	open, showCollapsed = false, showDialog = true, ...props
}) => {
	const { replace: redirect } = useRouter()

	const Icon = icon
	const [isOpened, setIsOpened] = useState<boolean>(open)

	useMemo(() => {
		open ? onOpen && onOpen() : isOpened && onClose && onClose()
	}, [open])

	const panel = parseUi({
		className: `${colors[color]} min-w-[200px] z-10`,
		name: 'Navbar.NavItem',
		styles: {
			gaps: { options: gaps, selected: gap },
		},
	})

	onClick = onClick ? onClick : href ? () => redirect(href) : undefined

	return (
		<NavItemContext.Consumer>
			{({ close: closeMenu, type }) => (
				<>
					<Popover.Button
						as="div"
						className={`${open ? `${colors[color]}` : ''} hover:${colors[color]} ${(type === 'dialog' ? showDialog : true) ? 'inline-block flex  cursor-pointer  items-center focus-visible:outline-0' : 'hidden'} `}
									// @ts-expect-error onClick exists for as div
						onClick={onClick}
						{...sanitizeProps(props)}
					>
						{Icon ? <Icon className={`inline-block size-5 ${label ? 'mr-2' : ''}`}/> : null}
						<span className={`${type === 'standard' ? 'text-md' : 'text-2xl'} font-semibold`}>{label}</span>
						{children
							? <ChevronDownIcon
									aria-hidden="true"
									className={`${isOpened ? 'rotate-180' : ''} size-5 flex-none`}
								/>
							: null}
					</Popover.Button>

					{children
						? <Popover.Panel
								className={`${panel.className} ${type === 'dialog' ? 'py-3' : 'absolute mt-1 px-4 py-3'} ${dropdownPosition === 'left' ? '-translate-x-3/4' : ''} ring-gray-300 lg:rounded-md lg:shadow-md lg:shadow-gray-500 lg:ring-1`}>
								<Grid gap="medium" onClick={() => close()}>
									{typeof children === 'function' ? children({ close, open }) : children}
								</Grid>
							</Popover.Panel>
						: null}
				</>
			)}
		</NavItemContext.Consumer>
	)
}

export default Inner
