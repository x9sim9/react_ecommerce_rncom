'use client'

import { isEqual } from 'lodash'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logger } from '@/helpers/logger'
import type { Empty } from '@/helpers/typescript'
import { flashSelector } from '@/lib/store'
import { usePathname } from '@/navigation'

import { addMessage, type AddMessagePayload, type Flash, removeMessage, RemoveMessagePayload, truncateMessages, TruncateMessagesPayload } from '@/components/ui/flash/flash_slice'

export type UseFlashProps = Empty

export type AddMessageProps = {
	redirect?: boolean
} & Omit<AddMessagePayload['payload'], '_redirectFrom'>

export type RemoveMessageProps = RemoveMessagePayload['payload']

export type TruncateMessageProps = TruncateMessagesPayload['payload']

export type UseFlashResult = {
	addMessage: (props: AddMessageProps) => void,
	flash: Flash
	isReady: boolean
	removeMessage: (props: RemoveMessageProps) => void,
	truncateMessages: (props: TruncateMessageProps) => void,
}

export type UseFlashResultFn = (props?: UseFlashProps) => UseFlashResult

/**
 * flash messages
 * @returns result flash messages and helper functions
 */
export const useFlash: UseFlashResultFn = () => {
	const flash = useSelector(flashSelector, isEqual)
	const dispatch = useDispatch()
	const pathname = usePathname()

	useMemo(() => {
		logger.debug('ui.flash.useFlash', { flash: flash })
	}, [flash, pathname])

	return {
		addMessage: ({ redirect, ...props }) => {
			dispatch(addMessage({ _redirectFrom: redirect ? pathname : undefined, ...props }))
		},
		flash,
		isReady: true,
		removeMessage: (props) => {
			dispatch(removeMessage(props))
		},
		truncateMessages: (props) => {
			dispatch(truncateMessages(props))
		},
	}
}

export default useFlash