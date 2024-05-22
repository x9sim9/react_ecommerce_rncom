import { ApolloQueryResult } from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { relayStylePagination } from '@apollo/client/utilities'
import 'dotenv/config'

import { fragments } from '@/graphql/fragments'
import { AddToCartResultItem } from '@/graphql/mutations/add_to_cart'

import { getAuthToken } from '@/components/common/use_auth_token'

export { type ApolloQueryResult, type FetchResult, gql } from '@apollo/client'
export { useQuery, useSuspenseQuery } from '@apollo/client/index.js'

export type ApolloMutationResult<T> = {
	[key: string]: T
}

export type MutationResult = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__typename?: string;
} & Pick<AddToCartResultItem, 'errors' | 'result' | 'showError'>

/**
 * gets the first item from a mutation result
 * @param result the mutation result
 * @returns the first item
 */
export const getFirstMutationResult = <T extends MutationResult>(result: ApolloQueryResult<ApolloMutationResult<T>>): T => Object.values(result.data)[0] as T

/** Apollo HttpLink Props Shared Config */
export const httpLinkProps = {
	fetchOptions: { cache: 'no-store' },
	uri: 'http://127.0.0.1:3021/graphql',
}

/** Apollo Link Props Shared Config */
export const linkProps = [
	// eslint-disable-next-line @typescript-eslint/naming-convention,lodash/prefer-noop
	onError(({ graphQLErrors, networkError }) => {
		// if (graphQLErrors)
		// 	graphQLErrors.forEach((graphQLError) => rollbar.error('Apollo Client GraphQL error', graphQLError))
		//
		// if (networkError) rollbar.error('Apollo Client network error', networkError)
	}),
	setContext(async (_, { headers }) => {
		const token = getAuthToken()

		return {
			headers: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Access-Control-Allow-Credentials': 'true',
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Access-Control-Allow-Origin',
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Access-Control-Allow-Origin': '*',
				...headers,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Authorization: token,
			},
		}
	}),
]

/** Apollo Cache Props Shared Config */
export const cacheProps = {
	fragments: createFragmentRegistry(...fragments),
	typePolicies: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Query: {
			fields: {
				partner: {
					read(partner: unknown) {
						return partner || null
					},
				},
				unmatchedResultsConnection: relayStylePagination(),
			},
		},
	},
}