import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import Provider from '@/app/provider'
import type { LocaleType } from '@/helpers/translation'

import Languages from '@/components/common/languages'

import { Grid, Navbar, Page } from '@/components/ui'

const inter = Inter({
	preload: true,
	subsets: ['latin'],
	variable: '--font-inter',
})


export type LayoutProps = {
	children: ReactNode
	params: {
		locale: LocaleType
	}
}

/**
 * layout for developer section
 * @param props Layout props
 * @param props.children children
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns the layout
 */
const Layout = async ({ children, params: { locale } }: LayoutProps) => (
	<html className={`${inter.variable} font-sans`}>
		<head></head>
		<body>
			<Provider>
				<Page>
					<Grid verticalAlign="top">
						<Grid className="mb-[-3px] pt-5" gap="medium">
							<Navbar.Navbar gap="medium">
								<Languages className="ms-auto" dropdownPosition="left" locale={locale} type="navitem"/>
							</Navbar.Navbar>
						</Grid>

						{children}

						<div className="mb-10 mt-5">
							<Grid align="center">
								<Languages locale={locale} type="list"/>
							</Grid>
						</div>
					</Grid>
				</Page>
			</Provider>
		</body>
	</html>
)

export default Layout