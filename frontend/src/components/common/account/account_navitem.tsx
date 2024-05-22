'use client'

import { FC } from 'react'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import useCustomer from '@/components/common/customer/use_customer'

import { Button, Grid, Link, Navbar } from '@/components/ui'

export type DropdownMenuProps = Empty

/**
 * navbar navitem for account section
 * @returns the navbar navitem
 */
export const AccountNavItem: FC<DropdownMenuProps> = () => {
	const t = useTranslation({ component: 'common.account.accountNavitem' })
	const { customer, logout } = useCustomer()

	return customer.isAuthenticated
		? (
				<Navbar.NavItem data-testid="common.account.accountNavitem.myAccount" label={t('menuTitle')}>
					<Grid gap={{ default: 'small', lg: 3 }}>
						<Link color="black" data-testid="common.account.accountNavitem.accountHome" href="/account" size={{ default: 'large', lg: 'small' }}>{t('menu.account')}</Link>
						<Link color="black" data-testid="common.account.accountNavitem.accountOrders" href="/account/orders" size={{ default: 'large', lg: 'small' }}>{t('menu.orders')}</Link>
						<Link color="black" data-testid="common.account.accountNavitem.accountAddresses" href="/account/addresses" size={{ default: 'large', lg: 'small' }}>{t('menu.addresses')}</Link>
						<hr className="h-px border-0 bg-gray-300"/>
						<Button color="black" data-testid="common.account.accountNavitem.logout" onClick={logout} size={{ default: 'large', lg: 'small' }} type="text">{t('menu.logout')}</Button>
					</Grid>
				</Navbar.NavItem>
			)
		: (
				<Navbar.NavItem data-testid="common.account.accountNavitem.myAccount" href="/login" label={t('menuTitle')}/>
			)
}

export default AccountNavItem