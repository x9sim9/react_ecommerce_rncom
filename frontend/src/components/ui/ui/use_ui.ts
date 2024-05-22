'use client'

import tailwindConfig from '@/../tailwind.config'
import { invert, isEqual, keys, mapValues } from 'lodash'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { Empty } from '@/helpers/typescript'
import { uiSelector } from '@/lib/store'

import { type Ui, updateWidth } from '@/components/ui/ui/ui_slice'

export type UseUiProps = Empty

export type UseUiResult = Empty

export type UseUiResultFn = (props?: UseUiProps) => UseUiResult

/**
 * Listens for breakpoint width changes and updates the ui
 * @returns void
 */
export const useUi: UseUiResultFn = () => {
	const ui = useSelector(uiSelector, isEqual)
	const dispatch = useDispatch()
	const [ready, setReady] = useState<boolean>(false)

	const onResize = () => {
		if (typeof window !== 'undefined') {
			const breakpoints = invert(mapValues(tailwindConfig?.theme?.screens, (value: string, key: string) => +(value).replace(/px$/, '')))
			const breakpointWidths = keys(breakpoints).sort((n1, n2) => +n1 - +n2)

			let currentBreakpoint = ''
			const currentBreakpointChain = ['default']
			breakpointWidths.every((width) => {
				currentBreakpointChain.push(breakpoints[width])
				if (+width > window.innerWidth) {
					currentBreakpoint = breakpoints[width]
					return false
				}

				return true
			})

			dispatch(updateWidth({ breakpoint: currentBreakpoint as Ui['breakpoint'], breakpoints: currentBreakpointChain as Ui['breakpoints'], width: window.innerWidth }))
		}
	}

	useMemo(() => {
		if (!ready && typeof window !== 'undefined') {
			window.addEventListener('resize', onResize)
			onResize()
			setReady(true)
		}
	}, [])

	return () => typeof window !== 'undefined' ? window.removeEventListener('resize', onResize) : null
}

export default useUi