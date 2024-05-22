import { createSlice, Draft } from '@reduxjs/toolkit'
import { omit, set } from 'lodash'

export { type CaseReducer } from '@reduxjs/toolkit'

export type FlashMessage = {
	_redirectFrom?: string
	category?: string
	expire?: number
	id: string,
	message?: string | string[]
	title?: string
	type: 'danger' | 'info' | 'success' | 'warning'
}

export type Flash = {
	flashes: {
		[category: string]: {
			[id: string]: FlashMessage
		}
	}
}

const initialState: Flash = {
	flashes: {},
}

/* -- Add Message -- */
export type AddMessagePayload = {
	payload: FlashMessage
}
export type AddMessageReducer = (state: Draft<Flash>, payload: AddMessagePayload) => void

/**
 * add flash message
 * @param state the flash state
 * @param props addMessageReducer props
 * @param props.payload the redux reducer payload
 */
export const addMessageReducer: AddMessageReducer = (state, { payload: message }) => {
	set(state.flashes, [message.category || 'default', message.id], message)
}

/* -- Remove Message -- */
export type RemoveMessagePayload = {
	payload: {
		category?: FlashMessage['category']
		id: FlashMessage['id'],
	}
}
export type RemoveMessageReducer = (state: Draft<Flash>, payload: RemoveMessagePayload) => void

/**
 * remove flash message
 * @param state the flash state
 * @param props removeMessageReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.category the flash message category
 * @param props.payload.id the id of the flash messages
 */
export const removeMessageReducer: RemoveMessageReducer = (state, { payload: { category, id } }) => {
	state.flashes = omit(state.flashes, [category || 'default', id])
}

/* -- Truncate Messages -- */
export type TruncateMessagesPayload = {
	payload: {
		category?: FlashMessage['category']
	}
}
export type TruncateMessagesReducer = (state: Draft<Flash>, payload: TruncateMessagesPayload) => void

/**
 * truncate flash messages for group
 * @param state the flash state
 * @param props truncateMessagesReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.category the flash message category
 */
export const truncateMessagesReducer: TruncateMessagesReducer = (state, { payload: { category } }) => {
	state.flashes = omit(state.flashes, [category || 'default'])
}

/* -- Redux -- */
export const flashSlice = createSlice({
	initialState,
	name: 'flash',
	reducers: {
		addMessage: addMessageReducer,
		removeMessage: removeMessageReducer,
		truncateMessages: truncateMessagesReducer,
	},
})

export const { addMessage, removeMessage, truncateMessages } = flashSlice.actions
export const flashReducer = flashSlice.reducer
export default flashReducer