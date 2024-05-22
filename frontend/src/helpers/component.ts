import { omit } from 'lodash'

type StringOrArray = string | string[] | undefined

type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
	infer ElementType
>
	? ElementType
	: never

/**
 * sanitize spread props removing unwanted keys
 * @param props the props to sanitixe
 * @param omitKeys the keys to remove from props
 * @returns the sanitized props
 */ //  R extends undefined ? Omit<P, keyof O> : R
export const sanitizeProps = <P extends object = object, O extends StringOrArray = undefined>(props?: P, omitKeys?: O): O extends undefined ? P : Omit<Omit<P, O extends string[] ? O[number] : O extends string ? O : never>, 'key'> => {
	const keys: string[] = omitKeys
		? Array.isArray(omitKeys)
			? omitKeys
			: [omitKeys]
		: []
	return omit<P>(props, ['key', ...keys]) as O extends undefined ? P : Omit<Omit<P, O extends string[] ? O[number] : O extends string ? O : never>, 'key'>
}