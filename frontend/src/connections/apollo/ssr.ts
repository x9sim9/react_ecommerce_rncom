import { ApolloLink, HttpLink } from '@apollo/client'
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'

import { cacheProps, httpLinkProps, linkProps } from './index'

export { type ApolloQueryResult, type FetchResult, gql } from '@apollo/client'
export { useLazyQuery, useQuery, useSuspenseQuery } from '@apollo/client/index.js'

export const Provider = ApolloNextAppProvider

/**
 * Server Side Rendering (SSR) Apollo Client connection for GraphQL
 * @returns NextSSRApolloClient
 */
export const createApolloClient = () => {
	const httpLink = new HttpLink({
		...httpLinkProps,
	})

	return new NextSSRApolloClient({
		// use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
		cache: new NextSSRInMemoryCache({
			...cacheProps,
		}),
		link: typeof window === 'undefined'
			? ApolloLink.from([
					// in a SSR environment, if you use multipart features like
					// @defer, you need to decide how to handle these.
					// This strips all interfaces with a `@defer` directive from your queries.
				new SSRMultipartLink({
					stripDefer: true,
				}),
				...linkProps,
				httpLink,
			])
			: ApolloLink.from([
				...linkProps,
				httpLink,
			]),
	})
}

export default createApolloClient