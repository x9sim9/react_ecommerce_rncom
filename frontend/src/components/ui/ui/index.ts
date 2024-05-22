import { forEach, has, pick, reverse, without } from 'lodash'
import { twMerge } from 'tailwind-merge'

import type { Ui } from '@/components/ui/ui/ui_slice'

export type MergeElement<HTMLElement, Target> = Omit<HTMLElement, keyof Target> & Target

export type UiOptions<Options extends number | string | undefined> = {
	[key in Exclude<Options, undefined>]: string
} & {
	default?: string
	none?: string
}

export type Breakpoints<T extends keyof UiOptions<number | string>> =
		| (keyof UiOptions<T>)[]
		| {
			'2xl'?: (keyof UiOptions<T>)[] | keyof UiOptions<T>
			default?: (keyof UiOptions<T>)[] | keyof UiOptions<T>
			lg?: (keyof UiOptions<T>)[] | keyof UiOptions<T>
			md?: (keyof UiOptions<T>)[] | keyof UiOptions<T>
			sm?: (keyof UiOptions<T>)[] | keyof UiOptions<T>
			xl?: (keyof UiOptions<T>)[] | keyof UiOptions<T>
		}
		| keyof UiOptions<T>


export type UIAttribute = number | string

export type UIStylesOptions = { [key: UIAttribute]: string }

/**
 * creates all the tailwind classes for the provided options
 * @param props parseUi props
 * @param props.className extra tailwind classes
 * @param props.name the name of the ui component
 * @param props.styles the styles for the component
 * 	options - all available options for style
 * 	selected - the selected style for options
 * @returns the tailwind classes names and the selected styles
 */
export const parseUi = ({
	className = '',
	name,
	styles,
}: {
	className?: string
	name?: string
	styles?: {
		[key: string]: {
			options: UIStylesOptions
			selected?: Breakpoints<keyof UiOptions<UIAttribute>>
		}
	}
}) => {
	const htmlStyles: { [key: string]: { [key: string]: UIAttribute | UIAttribute[] } | UIAttribute[] } = {}

	const parseStyles = ({
		attribute,
		options,
		prefix,
		selected,
	}: {
		attribute: string
		options: UIStylesOptions
		prefix?: string
		selected?: (keyof UiOptions<UIAttribute>)[] | keyof UiOptions<UIAttribute>
	}) => {
		if (selected !== undefined) {
			if (!Array.isArray(selected)) {
				selected = [selected]
			}
		} else {
			selected = []
		}

		if ('default' in options && !selected.includes('none')) {
			selected = [...selected, 'default']
		}

		selected.forEach((item) => {
			if (!(['default', 'none'] as UIAttribute[]).includes(item) && !(item in options)) {
				throw new Error(`Unknown style ${item} in attribute ${attribute}`)
			}
		})

		const className = Object.values(pick(options, selected))
				.join(' ') // combine groups of strings styles into single string
				.split(' ') // split each param into array
				.map((item) => (prefix ? `${prefix}:${item}` : item))
				.join(' ')

		const selectedStyles = without(selected, 'default')

		return { className, selectedStyles }
	}

	const classNames: string[] = []

	if (styles) {
		forEach(styles, (style, attribute) => {
			let styles = undefined

			if (typeof style.selected === 'object') {
				if (!Array.isArray(style.selected)) {
					Object.entries(style.selected).forEach(([key, currentSelected]) => {
						styles = parseStyles({
							attribute,
							options: style.options,
							prefix: key === 'default' ? undefined : key,
							selected: currentSelected,
						})

						classNames.push(styles.className)
					})

					if (style.selected) {
						htmlStyles[attribute] = style.selected
					}
				}
			} else {
				styles = parseStyles({ attribute, options: style.options, selected: style.selected })

				classNames.push(styles.className)

				if (styles.selectedStyles.length > 0) {
					htmlStyles[attribute] = styles.selectedStyles
				}
			}
		})
	}

	const attributes: { [key: string]: string | undefined } = {
		'ui-component': name,
	}

	if (Object.entries(htmlStyles).length > 0) {
		attributes['ui-styles'] = JSON.stringify(htmlStyles)
	}

	return {
		attributes,
		className: twMerge([...classNames, className]),
	}
}

// export const getBreakpointValue = (target: {}, breakpoints: Ui['breakpoints']) => {
// 	breakpoints.every((breakpoint) => {
// 		if()
// 	})
// }

// { default: 'small', md: 'medium', lg: 'large' }

type ValueOf<T> = T[keyof T]

export type GetBreakpointValuePropsOption<Options extends string> = {
	[key in Options]: string
}

export type GetBreakpointValueProps<Options extends string> = {
	breakpoints: Ui['breakpoints'],
	option: Breakpoints<keyof UiOptions<Options> | Options>,
}

/**
 * get the value based on the active breakpoint
 * @param option the breakpoint options
 * @param breakpoints the active breakpoints
 * @returns the active breakpoint value
 */
export const getBreakpointValue = <Options extends string>(
	option: GetBreakpointValueProps<Options>['option'],
	breakpoints: GetBreakpointValueProps<Options>['breakpoints'],
): ValueOf<Breakpoints<Options>> => {
	let targetKey = ''
	if (typeof option === 'object') {
		reverse([...breakpoints]).every((breakpoint) => {
			if (has(option, breakpoint)) {
				targetKey = option[breakpoint as keyof Breakpoints<Options>]
				return false
			}

			return true
		})
		return targetKey as ValueOf<Breakpoints<Options>>
	}
	return option as ValueOf<Breakpoints<Options>>
}

export default parseUi
