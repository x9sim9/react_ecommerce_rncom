'use server'

import { GlobeAltIcon } from '@heroicons/react/24/solid'
import { FC, lazy } from 'react'

import { Categories } from '@/graphql/queries/categories'
import { sanitizeProps } from '@/helpers/component'
import { getTranslation, type LocaleType } from '@/helpers/translation'

import { Languages } from '@/components/common/languages'

import { Flash, Grid, Link, Navbar, Slug } from '@/components/ui'
import SuspenseLoading from '@/components/ui/suspense_loading'

const AccountNavItem = lazy(() => import('@/components/common/account/account_navitem'))
const SmallCart = lazy(() => import('@/components/storefront/shopping_cart/small_cart'))

export type HeaderProps = {
	categories: Categories
	locale: LocaleType
} & Navbar.NavbarProps

/**
 * page header
 * @param props Header props
 * @param props.categories all product categories
 * @param props.className html class names
 * @param props.locale the current locale (next-intl)
 * @returns the page header
 */
export const Header: FC<HeaderProps> = async ({ categories, className, locale, ...props }) => {
	const t = await getTranslation({ component: 'common.header', locale })

	return (
		<Grid className="mb-[-3px] pt-5" data-testid="common.header" gap="medium">
			<Navbar.Navbar {...{ className: `${className}`, ...sanitizeProps(props) } as Navbar.NavbarProps} gap="medium">
				<Navbar.NavItem className="pe-3" showCollapsed={true}>
					<Link href="/">
						<Grid className="whitespace-nowrap" gap="xs" size="flex">
							<GlobeAltIcon className="m-[-3px] text-purple-500" height="32"/>
						</Grid>
					</Link>
				</Navbar.NavItem>

				<Navbar.NavItem data-testid="common.header.allCategories" label={t('menu.browseByCategory')}>
					<Grid gap={{ default: 'small', lg: 3 }}>
						<Link color="black" href="/categories" size={{ default: 'large', lg: 'small' }}>
							{t('menu.allCategories')}
						</Link>
						<hr className="h-px border-0 bg-gray-300"/>
						{categories?.map((category) => (
							<Slug color="black" id={category.id} key={category.id} name={category.name} size={{ default: 'large', lg: 'small' }} type="category">
								{category.name}
							</Slug>
						))}
					</Grid>
				</Navbar.NavItem>

				<SuspenseLoading className="h-[21px] w-[82px]" type="block">
					<AccountNavItem/>
				</SuspenseLoading>

				<Languages className="ms-auto" locale={locale} type="navitem"/>

				<Navbar.NavItem showCollapsed={true} showDialog={false}>
					<SuspenseLoading className="h-[32px] w-40" layout={[2, 3, 7]} type="block">
						<SmallCart/>
					</SuspenseLoading>
				</Navbar.NavItem>
			</Navbar.Navbar>
			<Flash showAllCategories={true}/>
		</Grid>
	)
}
export default Header
