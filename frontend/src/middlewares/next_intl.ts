/**
 * Next Intl Middleware
 * https://next-intl-docs.vercel.app/docs/routing/middleware
 */

import { locales } from '@/../messages'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

import { localePrefix, pathnames } from '@/navigation'
import { defaultLocale } from '@/translations'


/**
 * Middleware configuration for Next Intl
 * @param request - NextRequest
 * @returns NextResponse
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (request: NextRequest) {
	const middleware = createMiddleware({ defaultLocale, localePrefix, locales, pathnames })

	const response = middleware(request)

	response.headers.set('x-pathname', decodeURI(new URL(request.url).pathname))

	return response
}

export const config = {
	matcher: ['/', '/([a-z]{2}-[A-Z]{2}|[a-z]{2})/:path*'],
	// eslint-disable-next-line @typescript-eslint/naming-convention
	unstable_allowDynamic: ['**/node_modules/lodash/_root.js'], // use a glob to allow anything in the function-bind 3rd party module
}