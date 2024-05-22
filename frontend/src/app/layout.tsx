'use server'
// This page must exist https://next-intl-docs.vercel.app/docs/environments/error-files

import { startCase, toLower } from 'lodash'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

import { getRelativePath } from '@/helpers/path'

/**
 * NextJS root layout
 * @param props RootLayout props
 * @param props.children children
 * @returns children
 */
const RootLayout = async ({ children }: { children: ReactNode }) => children

/**
 * generate page meta data
 * @returns the generated meta data
 */
export const generateMetadata = async () => {
	const paths = await getRelativePath({ headers: headers() })
	const pathNames = paths.split('/').filter((path) => path)

	return {
		title: startCase(toLower(pathNames.slice(-1)[0]?.replace(/-/g, ' '))) || '/',
	}
}

export default RootLayout