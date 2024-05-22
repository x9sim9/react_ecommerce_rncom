'use server'

import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import type { LocaleType } from '@/helpers/translation'

import { Grid, Page as PageComponent, PageProps as PageComponentProps } from '@/components/ui'

import Footer, { type FooterProps } from './footer'
import Header, { type HeaderProps } from './header'

export type PageProps = {
	footer?: FooterProps
	header: HeaderProps
	locale: LocaleType
} & PageComponentProps

/**
 * The page layout
 * @param props Page props
 * @param props.children children
 * @param props.footer props for Footer
 * @param props.header props for Header
 * @param props.locale the current locale (next-intl)
 * @returns the page
 */
export const Page: FC<PageProps> = ({ children, footer, header, locale, ...props }: PageProps) => (
	<PageComponent {...sanitizeProps(props)}>
		<Grid className="px-1">
			<Header {...header} locale={locale}/>
			<Grid className="grow" verticalAlign="top">
				{children}
			</Grid>
			<Footer {...footer} className="sticky" locale={locale}/>
		</Grid>
	</PageComponent>
)

export default Page
