'use server'

import { FC, ReactNode } from 'react'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import { Grid, GridSpan, Link } from '@/components/ui'

export type LayoutPageProps = {
	children: ReactNode
	params: {
		locale: LocaleType
	}
}

/**
 * layout for ui components section
 * @param props HomePage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @param props.children children
 * @returns the layout
 */
const LayoutPage: FC<LayoutPageProps> = async ({ children, params: { locale } }: LayoutPageProps) => {
	const t = await getTranslation({ app: '/--/ui', locale })
	return (
		<Grid size={12} verticalAlign="top">
			<GridSpan size={{ default: 3, md: 2, '2xl': 1 }}>
				<Grid gap="small" verticalAlign="top">
					<Link href="/--" size="large">{t('menu.developer')}</Link>
					<hr></hr>
					<Link href="/--/ui" size="large">{t('menu.uiHome')}</Link>
					<hr></hr>
					<Link href="/--/ui/breakpoints" size="large">{t('menu.breakpoints')}</Link>
					<Link href="/--/ui/button" size="large">{t('menu.button')}</Link>
					<Link href="/--/ui/currency" size="large">{t('menu.currency')}</Link>
					<Link href="/--/ui/form" size="large">{t('menu.form')}</Link>
					<Link href="/--/ui/grid" size="large">{t('menu.grid')}</Link>
					<Link href="/--/ui/heading" size="large">{t('menu.heading')}</Link>
					<Link href="/--/ui/link" size="large">{t('menu.link')}</Link>
					<Link href="/--/ui/list" size="large">{t('menu.list')}</Link>
				</Grid>
			</GridSpan>
			<GridSpan size={{ default: 9, md: 10, '2xl': 11 }}>
				<Grid verticalAlign="top">
					{children}
				</Grid>
			</GridSpan>
		</Grid>
	)
}

export default LayoutPage