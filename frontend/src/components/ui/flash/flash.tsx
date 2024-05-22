'use client'

import { forEach, values } from 'lodash'
import { FC } from 'react'

import { usePathname } from '@/navigation'

import { Grid } from '@/components/ui'
import useFlash from '@/components/ui/flash/use_flash'

import type { FlashMessage } from './flash_slice'
import Message from './message'

export type FlashProps = {
	category?: string,
	showAllCategories: boolean
}


/**
 * flash messages
 * @param props Flash props
 * @param props.category the flash message category
 * @param props.showAllCategories show messages for all categories
 * @returns the flash messages
 */
export const Flash: FC<FlashProps> = ({ category, showAllCategories = false }) => {
	const { flash, removeMessage } = useFlash()
	const pathname = usePathname()

	let messages: FlashMessage[] = values(flash.flashes.default)

	if (showAllCategories) {
		forEach(flash.flashes, (categoryMessages, category) => {
			if (category !== 'default') {
				messages = [...messages, ...values(categoryMessages)]
			}
		})
	}

	// ignore redirect messages before redirect
	messages = messages.filter((messages) => !messages._redirectFrom || messages._redirectFrom !== pathname)

	if (messages.length === 0) {
		return null
	}

	// remove consumed messages from flash
	messages.forEach((message) => {
		window.setTimeout(() => {
			removeMessage({ category: message.category, id: message.id })
		}, (message.expire && message.expire * 1000) || 15000)
	})

	return (
		<Grid gap="small">
			{messages.map((message) => (
				<Message data-id={message.id} data-testid="ui.flash.message" date-test-key={message.id} key={message.category + message.id} title={message.title} type={message.type}>{message.message}</Message>
			))}
		</Grid>
	)
}

export default Flash