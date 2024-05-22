'use server'

import { locales } from '@/../messages'
import { NextPage } from 'next'
import { ReactNode } from 'react'

import '@/styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-loading-skeleton/dist/skeleton.css'

import Provider from './provider'

export type LocaleLayoutProps = {
	children: ReactNode;
}

/**
 * next-intl locale layout
 * @param props LocaleLayout props
 * @param props.children children
 * @returns children
 */
const LocaleLayout: NextPage<LocaleLayoutProps> = async ({ children }: LocaleLayoutProps) => (
	<Provider>
		{children}
	</Provider>
)

/**
 * get the current locale and adds it to params (available to all pages)
 * @returns the current locale
 */
export const generateStaticParams = async () => locales.map((locale) => ({ locale }))


export default LocaleLayout