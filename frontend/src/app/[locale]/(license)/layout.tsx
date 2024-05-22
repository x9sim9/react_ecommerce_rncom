'use server'

import type { NextPage } from 'next'
import type { ReactNode } from 'react'

import StorefrontLayout from '@/app/[locale]/(storefront)/layout'
import type { LocaleType } from '@/helpers/translation'

export type LicenseLayoutProps = {
	children: ReactNode
	params: {
		locale: LocaleType
	}
}

/**
 * the storefront layout
 * @param props LicenseLayout props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @param props.children children
 * @returns layout content
 */
const LicenseLayout: NextPage<LicenseLayoutProps> = async ({ children, params: { locale } }: LicenseLayoutProps) => (
	<StorefrontLayout params={{ locale }}>
		{children}
	</StorefrontLayout>
)

export default LicenseLayout