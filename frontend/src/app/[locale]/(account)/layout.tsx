'use server'

import type { NextPage } from 'next'
import type { ReactNode } from 'react'

import StorefrontLayout from '@/app/[locale]/(storefront)/layout'
import type { LocaleType } from '@/helpers/translation'

import Authenticate from './authenticate'

export type AccountLayoutProps = {
	children: ReactNode
	params: {
		locale: LocaleType
	}
}

/**
 * the layout for all account pages
 * @param props StorefrontLayout props
 * @param props.children children
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns the storefront layout content
 */
const AccountLayout: NextPage<AccountLayoutProps> = async ({ children, params: { locale } }: AccountLayoutProps) => (
	<StorefrontLayout params={{ locale }}>
		<Authenticate>
			{children}
		</Authenticate>
	</StorefrontLayout>
)

export default AccountLayout