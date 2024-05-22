'use server'

import type { NextPage } from 'next'
import { lazy, Suspense } from 'react'

import { getTranslation, type LocaleType } from '@/helpers/translation'

const PageInfo = lazy(() => import('@/components/common/page_info'))
const Login = lazy(() => import('@/components/common/customer/login'))

export type LoginPagePageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * storefront login page
 * @param props LoginPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const LoginPage: NextPage<LoginPagePageProps> = async ({ params: { locale } }: LoginPagePageProps) => {
	const t = await getTranslation({ app: '/login', locale })

	return (
		<Suspense>
			<PageInfo breadcrumbTitle={t('breadcrumbTitle')} server={{ locale }} title={t('pageTitle')}/>

			<Login/>
		</Suspense>
	)
}

export default LoginPage