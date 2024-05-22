import type { Empty } from '@/helpers/typescript'

export type UseAuthenticationProps = Empty

export type SetTokenProps = {
	token: string
}

export type UseAuthenticationResult = {
	deleteToken: () => void,
	getToken: () => string,
	setToken: ({ token }: SetTokenProps) => void,
}

export type UseAuthenticationResultFn = (props?: UseAuthenticationProps) => UseAuthenticationResult

/**
 * get the current auth token (if exists)
 * @returns the auth token
 */
export const getAuthToken = () => (typeof window !== 'undefined' && localStorage.getItem('token')) || ''

/**
 * auth token
 * @returns auth token helper functions
 */
export const useAuthToken: UseAuthenticationResultFn = () => ({
	deleteToken: () => localStorage.removeItem('token'),
	getToken: getAuthToken,
	setToken: ({ token }) => {
		localStorage.setItem('token', token)
	},
})