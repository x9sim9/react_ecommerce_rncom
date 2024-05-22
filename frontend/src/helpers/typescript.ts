// ReturnType
// Awaited (from promise)
// Parameters (props of function)

export type Empty = object

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Impossible<K extends keyof any> = {
	[P in K]: never;
}
type NoExtraProperties<T, U extends T = T> = Impossible<Exclude<keyof U, keyof T>> & U

type NeverOptionals<T> = {
	[P in keyof T]?: never
}


// eslint-disable-next-line no-use-before-define
export type ExactlyTheGivenType<T extends Base, Base> = Base extends Base
		// eslint-disable-next-line @typescript-eslint/ban-types
	? {} extends Omit<T, keyof Base>
			? T
			: Record<
						// @ts-expect-error Special Typescript Function
						// eslint-disable-next-line no-undef
				__internal__,
						`Following key is redundant: ${keyof Omit<T, keyof Base> & string}`
			>
	: never

export type OmitProps<MustHave, MustNotHave> =
		ExactlyTheGivenType<
				NeverOptionals<MustNotHave> &
				Omit<Required<MustHave>, keyof MustNotHave>,
				NeverOptionals<MustNotHave> &
				Omit<Required<MustHave>, keyof MustNotHave>
		>

export type KeysOfValue<T, V extends T[keyof T]> =
		{ [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]

export type PickOfValue<T, V extends T[keyof T]> = Pick<T, KeysOfValue<T, V>>