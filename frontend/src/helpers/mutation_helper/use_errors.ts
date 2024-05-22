import { type Dispatch, type SetStateAction, useState } from 'react'

import { ApolloQueryResult, FetchResult, MutationResult } from '@/connections/apollo'
import type { Empty } from '@/helpers/typescript'

export type UseErrorErrors = {
	message: string,
	showError: boolean,
}

export type UseErrorsProps = Empty

export type UseErrorsResult<T extends MutationResult> = {
	errors: UseErrorErrors[]
	parseErrors: <Type extends MutationResult = T>(result: FetchResult<ApolloQueryResult<Type>>) => void
	resetErrors: () => void
	setErrors: Dispatch<SetStateAction<UseErrorErrors[]>>
}

export type UseErrorsResultFn<T extends MutationResult> = () => UseErrorsResult<T>

/**
 * handles errors from mutations
 * @returns the errors and helper functions
 *    errors - the mutation errors
 *    parseErrors() - parses returned errors
 *    resetErrors() - empty all errors
 *    setErrors() - set the current errors
 */
export const useErrors = <T extends MutationResult>(): UseErrorsResult<T> => {
	const [errors, setErrors] = useState<UseErrorErrors[]>([])

	const parseErrors = <Type extends MutationResult = T>(result: FetchResult<ApolloQueryResult<Type>>) => {
		const allErrors: UseErrorErrors[] = []
		result.errors?.map((error) => {
			allErrors.push({ message: error.toString(), showError: false })
		})

		if (result.data) {
			Object.values(result.data).map((mutation) => {
				mutation?.errors?.map((error: UseErrorErrors['message']) => {
					allErrors.push({ message: error, showError: mutation.showError || false })
				})
			})
		}

		setErrors(allErrors)
	}

	return {
		errors,
		parseErrors,
		resetErrors: () => setErrors([]),
		setErrors,
	}
}

export default useErrors