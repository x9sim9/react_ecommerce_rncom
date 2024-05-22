'use client'

import { Popover, PopoverButtonProps } from '@headlessui/react'
import * as React from 'react'
import { ComponentProps, createContext, DetailedHTMLProps, ElementType, FC, type HTMLAttributes, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Link, LinkProps } from '@/components/ui/link'
import { type MergeElement, parseUi } from '@/components/ui/ui'

import Inner, { type InnerProps } from './inner'

export type NavItemContextType = {
	close: () => void
	type: 'dialog' | 'standard'
}

export const NavItemContext = createContext<NavItemContextType>({ close: () => undefined, type: 'standard' })

export type NavItemPropsCommon = {
	color?: 'blue' | 'green' | 'none' | 'orange' | 'purple' | 'red' | 'white' | 'yellow'
	dropdownPosition?: 'left' | 'right'
	icon?: FC<ComponentProps<'svg'>>
	label?: ReactNode | string
	linkProps?: LinkProps
	showCollapsed?: boolean
	showDialog?: boolean
}

export type NavItemPropsMenu = MergeElement<
	PopoverButtonProps<ElementType<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>>,
		{
			children?: (({ close, open }: { close: () => void; open: boolean }) => ReactNode) | ReactNode | string
			gap?: 'large' | 'medium' | 'small' | 'xl'
			href?: never
			onClose?: () => void
			onOpen?: () => void
		} & NavItemPropsCommon>

export type NavItemPropsLink = {
	gap?: never
} & LinkProps & NavItemPropsCommon

export type NavItemProps = NavItemPropsLink | NavItemPropsMenu

export const colors = {
	blue: 'bg-cyan-50', // Tailwind: hover:bg-cyan-50
	green: 'bg-teal-50', // Tailwind: hover:bg-teal-50
	none: '',
	orange: 'bg-orange-50', // Tailwind: hover:bg-orange-50
	purple: 'bg-purple-50', // Tailwind: hover:bg-purple-50
	red: 'bg-red-50', // Tailwind: hover:bg-red-50
	white: 'bg-white', // Tailwind: hover:bg-white
	yellow: 'bg-yellow-50', // Tailwind: hover:bg-yellow-50
}

export const gaps = {
	small: 'p-3',
	medium: 'p-5',
	large: 'p-6',
	xl: 'p-10',
}

/**
 * styled nav item (drop down menu, link or item)
 * @param props NavItem props
 * @param props.children children
 * @param props.className html class names
 * @param props.color color of nav item
 * @param props.dropdownPosition the position of the dropdown when clicked
 * @param props.gap gap between items
 * @param props.href link url
 * @param props.icon the @heroicon to use
 * @param props.label the label for the item
 * @param props.linkProps the props for the Link
 * @param props.showCollapsed show item in navbar when collapsed (default false)
 * @param props.showDialog show in dialog when collapsed (default true)
 * @returns the nav item
 */
export const NavItem: FC<NavItemProps> = ({
	children,
	className,
	color = 'white',
	gap = 'small',
	href,
	icon = undefined,
	label = '',
	linkProps,
	showCollapsed = false,
	showDialog = true,
	...props
}) => {
	const Icon = icon
	const nav = parseUi({
		className: `focus-visible:outline-0 ${className}`,
		name: 'Navbar.NavItem',
	})

	const showDisplay = (type: NavItemContextType['type']) =>
		(type === 'dialog' as NavItemContextType['type'] ? `${showDialog ? 'block' : 'hidden'}` : `${showCollapsed ? '' : 'hidden lg:'}inline-block`) // Tailwind: lg:block lg:inline-block


	return (
		<NavItemContext.Consumer>

			{({ close: closeMenu, type }) => (
				!icon && !label && !href
					? (
							<div {...{ className: `${className} ${showDisplay(type)}`, ...sanitizeProps(props) } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}>
								{children as ReactNode}
							</div>
						)
					: (href
							? (
									<div
										className={`hover:${colors[color]} cursor-pointer focus-visible:outline-0 ${showDisplay(type)}`} {...sanitizeProps(props) as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}>
										<Link {...{ className: `${nav.className} flex items-center`, color: 'black', href: href, size: `${type === 'standard' ? 'base' : '2xl'}`, ...linkProps } as LinkProps}
											onClick={() => closeMenu()}>
											{Icon ? <Icon className={`inline-block size-5 ${label ? 'mr-2' : ''}`}/> : null}
											{label}
										</Link>
									</div>
								)
							: (
									<Popover as="div" {...nav.attributes} className={`${nav.className} ${showDisplay(type)}`}>
										{({ close, open }) => (
											<Inner {...{
												close: () => {
													close()
													closeMenu()
												}, color, gap, icon, label, open: open, showCollapsed, showDialog, ...sanitizeProps(props),
											} as InnerProps}>
												{children as NavItemPropsMenu['children']}
											</Inner>
										)}
									</Popover>
								)
						)
			)}
		</NavItemContext.Consumer>
	)
}

NavItem.displayName = 'Navbar.NavItem'

export default NavItem
