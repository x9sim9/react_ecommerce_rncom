import { UserIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode } from 'react'

import { useTranslation } from '@/helpers/translation'

import { Grid, GridSpan, Link } from '@/components/ui'
import { Body, Head, Panel } from '@/components/ui/panel'

export type PageProps = {
	children: ReactNode
}

/**
 * shared content for all account pages
 * @param props PageContent props
 * @param props.children children
 * @returns account page
 */
export const PageContent: FC<PageProps> = ({ children }) => {
	const t = useTranslation({ component: 'account.pageContent' })

	return (
		<Grid size={12} verticalAlign="top">
			<GridSpan size={{ default: 0, md: 3, lg: 3, xl: 2 }}>
				<Panel data-testid="account.pageContent.menu">
					<Head icon={UserIcon}>
						{t('menuTitle')}
					</Head>
					<Body>
						<Grid gap="small">
							<Link color="black" data-testid="account.pageContent.homeLink" href="/account">{t('menu.home')}</Link>
							<Link color="black" data-testid="account.pageContent.ordersLink" href="/account/orders">{t('menu.orders')}</Link>
							<Link color="black" data-testid="account.pageContent.addressesLink" href="/account/addresses">{t('menu.addresses')}</Link>
						</Grid>
					</Body>
				</Panel>
			</GridSpan>

			<GridSpan size={{ default: 12, md: 9, lg: 9, xl: 10 }}>
				<Grid>
					{children}
				</Grid>
			</GridSpan>
		</Grid>
	)
}

export default PageContent