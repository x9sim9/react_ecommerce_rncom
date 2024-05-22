'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC, Fragment, useMemo, useState } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { useTranslation } from '@/helpers/translation'

import { Button, Grid, type GridProps, type GridSizes } from '@/components/ui'

import { NavItemContext, type NavItemContextType } from './nav_item'

export type NavbarGridSize = Omit<GridSizes, 'size'>

export type NavbarProps = GridProps

/**
 * styled navbar
 * @param props Navbar props
 * @param props.children children <NavItem> or ReactNode
 * @returns the navbar
 */
export const Navbar: FC<NavbarProps> = ({ children, ...props }) => {
	const t = useTranslation({ component: 'ui.navbar.navbar' })

	const [isMenuOpen, setMenuOpen] = useState(false)

	const dialog: NavItemContextType = useMemo(() => ({
		close: () => setMenuOpen(false), type: 'dialog',
	}), [])

	const standard: NavItemContextType = useMemo(() => ({
		close: () => setMenuOpen(false), type: 'standard',
	}), [])

	return (
		<>
			<Grid as="nav" size="flex" {...sanitizeProps(props)}>
				<NavItemContext.Provider value={standard}>
					{children}
				</NavItemContext.Provider>

				<div className="lg:hidden">
					<Button className="-me-5" color="none" onClick={() => setMenuOpen(true)}>
						<span className="sr-only">{t('openMenu')}</span>
						<Bars3Icon aria-hidden="true" height="32"/>
					</Button>
				</div>
			</Grid>
			<Transition show={isMenuOpen}>
				<Dialog as={Fragment} onClose={setMenuOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveTo="translate-x-full"
					>
						<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 lg:hidden">
							<Button className="absolute right-5 top-5" color="none" onClick={() => setMenuOpen(false)}>
								<span className="sr-only">{t('openMenu')}</span>
								<XMarkIcon aria-hidden="true" className="size-6"/>
							</Button>
							<NavItemContext.Provider value={dialog}>
								<Grid>
									{children}
								</Grid>
							</NavItemContext.Provider>
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>

	)
}

Navbar.displayName = 'Navbar.Navbar'

export default Navbar
