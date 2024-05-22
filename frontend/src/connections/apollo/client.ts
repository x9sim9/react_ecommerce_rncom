import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'

import { cacheProps, httpLinkProps, linkProps } from './index'

export { type ApolloQueryResult, type FetchResult, gql } from '@apollo/client'

/**
 * Default Apollo Client connection for GraphQL
 * @returns ApolloClient
 */
const createApolloClient = new ApolloClient({
	cache: new InMemoryCache({
		...cacheProps,
	}),
	link: ApolloLink.from([
		...linkProps,
		createHttpLink({
			...httpLinkProps,
		}),
	]),
})

export default createApolloClient