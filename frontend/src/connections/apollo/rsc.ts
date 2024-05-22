import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/client-react-streaming'

import { cacheProps, httpLinkProps } from './index'

export { type ApolloQueryResult, type FetchResult, gql } from '@apollo/client'

/**
 * React Server Components (RSC) Apollo Client connection for GraphQL
 * @returns ApolloClient
 */
export const createApolloClient = () => {
	const { getClient } = registerApolloClient(() => new ApolloClient({
		// }),
		cache: new InMemoryCache({
			...cacheProps,
		}),
		// link: new HttpLink({
		// 	...httpLinkProps,
		link: ApolloLink.from([
			// ...linkProps,
			createHttpLink({
				...httpLinkProps,
				uri: `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/graphql`,
			}),
		]),
	}))

	return getClient()
}

export default createApolloClient