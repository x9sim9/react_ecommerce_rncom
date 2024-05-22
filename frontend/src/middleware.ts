/**
 * NextJS Middleware
 *
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { stackMiddleware } from 'nextjs-handler-middleware'

// import { default as authToken } from './middlewares/auth_token'
import { default as intl } from './middlewares/next_intl'

// @ts-expect-error type for intl fails but works as expected
export default stackMiddleware(intl)

export const config = {
	matcher: ['/', '/([a-z]{2}-[A-Z]{2}|[a-z]{2})/:path*', '/contributions', '/--/:path*', '/account/:path*'],
	// eslint-disable-next-line @typescript-eslint/naming-convention
	unstable_allowDynamic: ['**/node_modules/lodash/_root.js'], // use a glob to allow anything in the function-bind 3rd party module
}